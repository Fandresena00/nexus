"use server";

import prisma from "@/src/lib/prisma";
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
  }
) => {
  try {
    const updated = await prisma.project.update({
      where: { id: projectId },
      data,
    });
    return updated;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

/**
 * Ensures a string is a valid ISO-8601 date string (YYYY-MM-DD or full ISO)
 * and converts it to a Date object if valid.
 * Returns undefined if input is falsy or not parseable.
 */
function parseDeadlineToDate(deadline?: string): Date | undefined {
  if (!deadline) return undefined;
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}$/;
  if (iso8601Regex.test(deadline)) {
    return new Date(deadline + "T00:00:00.000Z");
  }
  const dateObj = new Date(deadline);
  return isNaN(dateObj.getTime()) ? undefined : dateObj;
}

export const createProject = async (
  title: string,
  description: string,
  deadline: string,
  userId: string
) => {
  try {
    const parsedDeadline = parseDeadlineToDate(deadline);
    if (!parsedDeadline) {
      throw new Error("Invalid deadline format (YYYY-MM-DD or full ISO)");
    }
    const newProject = await prisma.project.create({
      data: { title, description, deadline: parsedDeadline, userId },
    });
    return newProject;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};
