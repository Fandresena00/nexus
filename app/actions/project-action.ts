"use server";

import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export const getProjectById = async (projectId: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

export const getUserProjects = async (userId: string) => {
  try {
    const userProjects = await prisma.project.findMany({
      where: {
        OR: [
          {
            userId: userId,
          },
          {
            access: {
              some: {
                userId: userId,
              },
            },
          },
        ],
      },
      orderBy: { createdAt: "desc" },
    });
    return userProjects;
  } catch (error) {
    console.error("Error fetching user projects:", error);
    throw error;
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    await prisma.project.delete({
      where: { id: projectId },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error };
  }
};

export const updateProject = async (
  projectId: string,
  userId: string,
  data: {
    title?: string;
    description?: string;
    deadline?: string;
    image?: string;
  },
) => {
  try {
    // Check user role - only OWNER and EDITOR can update projects
    const userRole = await getUserProjectRole(projectId, userId);
    if (!userRole || userRole === "VIEWER") {
      throw new Error("You don't have permission to update this project");
    }
    // Create update data object with proper types
    const updateData: {
      title?: string;
      description?: string;
      deadline?: Date;
      image?: string;
    } = {};

    // Add properties individually
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.image !== undefined) updateData.image = data.image;

    // Handle deadline conversion separately
    if (data.deadline) {
      const parsedDeadline = parseDeadlineToDate(data.deadline);
      if (!parsedDeadline) {
        throw new Error("Invalid deadline format");
      }
      updateData.deadline = parsedDeadline;
    }

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: updateData,
    });
    return updated;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

function parseDeadlineToDate(deadline?: string): Date | undefined {
  if (!deadline) return undefined;
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}$/;
  if (iso8601Regex.test(deadline)) {
    return new Date(deadline + "T00:00:00.000Z");
  }
  const dateObj = new Date(deadline);
  return isNaN(dateObj.getTime()) ? undefined : dateObj;
}

// Local development image upload - stores images in public/uploads folder
export const uploadImage = async (file: File): Promise<string> => {
  try {
    // For development: store images locally in public/uploads
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}-${file.name}`;
    const filePath = path.join(uploadsDir, uniqueFilename);

    // Write file to disk
    await fs.writeFile(filePath, buffer);

    // Return public URL path
    return `/uploads/${uniqueFilename}`;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};

export const createProject = async (
  title: string,
  description: string,
  deadline: string,
  userId: string,
  imageFile?: File,
) => {
  try {
    const parsedDeadline = parseDeadlineToDate(deadline);
    if (!parsedDeadline) {
      throw new Error("Invalid deadline format (YYYY-MM-DD or full ISO)");
    }

    let imageUrl: string | undefined;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        deadline: parsedDeadline,
        userId,
        image: imageUrl,
      },
    });
    return newProject;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

// Project Access Management Actions
async function addProjectAccess(
  projectId: string,
  userEmail: string,
  role: "OWNER" | "EDITOR" | "VIEWER",
  currentUserId: string,
) {
  try {
    // Check if current user is the project owner
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.userId !== currentUserId) {
      throw new Error("Only project owner can manage access");
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if user is already the owner
    if (project.userId === user.id) {
      throw new Error("Project owner already has access");
    }

    // Create or update access
    const access = await prisma.projectAccess.upsert({
      where: {
        userId_projectId: {
          userId: user.id,
          projectId: projectId,
        },
      },
      update: {
        role: role,
      },
      create: {
        userId: user.id,
        projectId: projectId,
        role: role,
      },
    });

    return { success: true, access };
  } catch (error) {
    console.error("Error adding project access:", error);
    throw error;
  }
}

export { addProjectAccess };

export const removeProjectAccess = async (
  projectId: string,
  userId: string,
  currentUserId: string,
) => {
  try {
    // Check if current user is the project owner
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.userId !== currentUserId) {
      throw new Error("Only project owner can manage access");
    }

    // Prevent removing the owner
    if (project.userId === userId) {
      throw new Error("Cannot remove project owner");
    }

    await prisma.projectAccess.delete({
      where: {
        userId_projectId: {
          userId: userId,
          projectId: projectId,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error removing project access:", error);
    throw error;
  }
};

export const updateProjectAccessRole = async (
  projectId: string,
  userId: string,
  role: "OWNER" | "EDITOR" | "VIEWER",
  currentUserId: string,
) => {
  try {
    // Check if current user is the project owner
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.userId !== currentUserId) {
      throw new Error("Only project owner can manage access");
    }

    // Prevent changing owner's role
    if (project.userId === userId) {
      throw new Error("Cannot change project owner's role");
    }

    const access = await prisma.projectAccess.update({
      where: {
        userId_projectId: {
          userId: userId,
          projectId: projectId,
        },
      },
      data: {
        role: role,
      },
    });

    return { success: true, access };
  } catch (error) {
    console.error("Error updating project access:", error);
    throw error;
  }
};

export const getProjectAccess = async (projectId: string) => {
  try {
    const access = await prisma.projectAccess.findMany({
      where: { projectId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return access;
  } catch (error) {
    console.error("Error fetching project access:", error);
    throw error;
  }
};

export const getUserProjectRole = async (
  projectId: string,
  userId: string,
): Promise<"OWNER" | "EDITOR" | "VIEWER" | null> => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return null;
    }

    // Check if user is the project owner
    if (project.userId === userId) {
      return "OWNER";
    }

    // Check ProjectAccess
    const access = await prisma.projectAccess.findUnique({
      where: {
        userId_projectId: {
          userId: userId,
          projectId: projectId,
        },
      },
    });

    return access ? (access.role as "OWNER" | "EDITOR" | "VIEWER") : null;
  } catch (error) {
    console.error("Error getting user project role:", error);
    return null;
  }
};
