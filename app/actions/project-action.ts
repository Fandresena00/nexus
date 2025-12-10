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
      where: { userId: userId },
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
  data: {
    title?: string;
    description?: string;
    deadline?: string;
    image?: string;
  },
) => {
  try {
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
