"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { TaskStatus } from "@/generated/prisma/enums";
import { getUserProjectRole } from "./project-action";

export async function createTask({
  projectId,
  userId,
  description,
  deadline,
  tag = [],
}: {
  projectId: string;
  userId: string;
  description: string;
  deadline: Date;
  tag: string[];
}) {
  try {
    // Check user role - only OWNER and EDITOR can create tasks
    const userRole = await getUserProjectRole(projectId, userId);
    if (!userRole || userRole === "VIEWER") {
      throw new Error("You don't have permission to create tasks");
    }

    const newTask = await prisma.task.create({
      data: {
        description: description || "",
        deadline,
        tag,
        projectId,
        userId,
      },
    });
    revalidatePath(`/project/${projectId}/kanban-board`);
    revalidatePath(`/project/${projectId}/list-view`);
    return newTask;
  } catch (err) {
    console.error("Erreur création:", err);
    throw new Error(err instanceof Error ? err.message : (err as string));
  }
}

export async function updateTask(
  taskId: string,
  userId: string,
  data: {
    description?: string;
    deadline?: Date;
    tag?: string[];
    taskStatus?: TaskStatus;
  },
) {
  try {
    // Get the task to find projectId
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    // Check user role - only OWNER and EDITOR can update tasks
    const userRole = await getUserProjectRole(task.projectId, userId);
    if (!userRole || userRole === "VIEWER") {
      throw new Error("You don't have permission to update tasks");
    }

    const updated = await prisma.task.update({
      where: { id: taskId },
      data,
    });

    revalidatePath(`/project/${updated.projectId}/kanban-board`);
    revalidatePath(`/project/${updated.projectId}/list-view`);
    return updated;
  } catch (err) {
    console.error("Erreur mise à jour:", err);
    throw new Error(err instanceof Error ? err.message : (err as string));
  }
}

// ✅ CORRECTION 7: Ajouter revalidatePath et meilleure gestion d'erreur
export async function updateTaskStatus(
  taskId: string,
  userId: string,
  taskStatus: TaskStatus,
) {
  try {
    // Get the task to find projectId
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    // Check user role - only OWNER and EDITOR can update task status
    const userRole = await getUserProjectRole(task.projectId, userId);
    if (!userRole || userRole === "VIEWER") {
      throw new Error("You don't have permission to update task status");
    }

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: { taskStatus },
    });

    // Rafraîchir le cache Next.js

    revalidatePath(`/project/${updated.projectId}/kanban-board`);
    revalidatePath(`/project/${updated.projectId}/list-view`);

    return updated;
  } catch (err) {
    console.error("Erreur mise à jour statut:", err);
    throw new Error(
      err instanceof Error ? err.message : "Failed to update task status",
    );
  }
}

export async function deleteTask(
  taskId: string,
  projectId: string,
  userId: string,
) {
  try {
    // Check user role - only OWNER and EDITOR can delete tasks
    const userRole = await getUserProjectRole(projectId, userId);
    if (!userRole || userRole === "VIEWER") {
      throw new Error("You don't have permission to delete tasks");
    }

    const deleted = await prisma.task.delete({
      where: { id: taskId },
    });

    revalidatePath(`/project/${projectId}/kanban-board`);
    revalidatePath(`/project/${projectId}/list-view`);

    return deleted;
  } catch (err) {
    console.error("Erreur suppression:", err);
    throw new Error(err instanceof Error ? err.message : (err as string));
  }
}

export async function deleteTaskByProject(projectId: string) {
  try {
    const deleted = await prisma.task.deleteMany({
      where: { projectId: projectId },
    });

    revalidatePath(`/project/${projectId}/kanban-board`);
    revalidatePath(`/project/${projectId}/list-view`);
    return deleted;
  } catch (err) {
    console.error("Erreur suppression:", err);
    throw new Error(err as string);
  }
}

export async function getTasksByProject(projectId: string) {
  try {
    const tasks = await prisma.task.findMany({
      where: { projectId },
      orderBy: { deadline: "asc" },
    });
    return tasks;
  } catch (err) {
    console.error("Erreur récupération:", err);
    throw new Error(err as string);
  }
}

export async function getTaskById(taskId: string) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });
    return task;
  } catch (err) {
    console.error("Erreur récupération:", err);
    throw new Error(err as string);
  }
}
