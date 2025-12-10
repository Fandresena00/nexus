"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { TaskStatus } from "@/generated/prisma/enums";

export async function createTask({
  projectId,
  userId,
  title,
  description,
  deadline,
  tag = [],
}: {
  projectId: string;
  userId: string;
  title: string;
  description: string;
  deadline: Date;
  tag: string[];
}) {
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description: description || "",
        deadline,
        tag,
        projectId,
        userId,
      },
    });

    revalidatePath(`/project/${projectId}/kanban`);
    return newTask;
  } catch (err) {
    console.error("Erreur création:", err);
    throw new Error(err as string);
  }
}

export async function updateTask(
  taskId: string,
  data: {
    title?: string;
    description?: string;
    deadline?: Date;
    tag?: string[];
    taskStatus?: TaskStatus;
  },
) {
  try {
    const updated = await prisma.task.update({
      where: { id: taskId },
      data,
    });

    revalidatePath(`/project/${updated.projectId}/kanban`);
    return updated;
  } catch (err) {
    console.error("Erreur mise à jour:", err);
    throw new Error(err as string);
  }
}

// ✅ CORRECTION 7: Ajouter revalidatePath et meilleure gestion d'erreur
export async function updateTaskStatus(taskId: string, taskStatus: TaskStatus) {
  try {
    const updated = await prisma.task.update({
      where: { id: taskId },
      data: { taskStatus },
    });

    // Rafraîchir le cache Next.js
    revalidatePath(`/project/${updated.projectId}/kanban`);

    return updated;
  } catch (err) {
    console.error("Erreur mise à jour statut:", err);
    return null; // Retourner null en cas d'erreur
  }
}

export async function deleteTask(taskId: string) {
  try {
    const deleted = await prisma.task.delete({
      where: { id: taskId },
    });

    revalidatePath(`/project/${deleted.projectId}/kanban-board`);
    revalidatePath(`/project/${deleted.projectId}/list`);

    return deleted;
  } catch (err) {
    console.error("Erreur suppression:", err);
    throw new Error(err as string);
  }
}

export async function deleteTaskByProject(projectId: string) {
  try {
    const deleted = await prisma.task.deleteMany({
      where: { projectId: projectId },
    });

    revalidatePath(`/project/${projectId}/kanban`);
    revalidatePath(`/project/${projectId}/list`);

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
