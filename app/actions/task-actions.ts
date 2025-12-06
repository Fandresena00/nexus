"use server";

import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { TaskStatus } from "@/generated/prisma/enums";

/**
 * Crée une nouvelle tâche pour un projet.
 * @param projectId ID du projet concerné
 * @param userId ID de l'utilisateur qui crée la tâche
 * @param title Titre de la tâche
 * @param description Description de la tâche
 * @param deadline Date limite de la tâche
 * @param tag Tableau des tags (optionnel)
 */
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
  description?: string;
  deadline: Date;
  tag?: string[];
}) {
  try {
    await prisma.task.create({
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
  } catch (err) {
    throw new Error(err as string);
  }
}

/**
 * Met à jour une tâche existante
 * @param taskId ID de la tâche à modifier
 * @param data Objets des champs à mettre à jour
 */
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
    revalidatePath(`/project/${updated.projectId}/list`);
    return updated;
  } catch (err) {
    throw new Error(err as string);
  }
}

/**
 * Met à jour le statut d'une tâche
 * @param taskId ID de la tâche à modifier
 * @param taskStatus Nouveau statut de la tâche
 */
export async function updateTaskStatus(taskId: string, taskStatus: TaskStatus) {
  try {
    const updated = await prisma.task.update({
      where: { id: taskId },
      data: { taskStatus },
    });

    revalidatePath(`/project/${updated.projectId}/kanban`);
    revalidatePath(`/project/${updated.projectId}/list`);
    return updated;
  } catch (err) {
    throw new Error(err as string);
  }
}

/**
 * Supprime une tâche
 * @param taskId ID de la tâche à supprimer
 */
export async function deleteTask(taskId: string) {
  try {
    const deleted = await prisma.task.delete({
      where: { id: taskId },
    });
    revalidatePath(`/project/${deleted.projectId}/kanban`);
    revalidatePath(`/project/${deleted.projectId}/list`);
    return deleted;
  } catch (err) {
    throw new Error(err as string);
  }
}

/**
 * Récupère toutes les tâches d'un projet
 * @param projectId ID du projet à récupérer
 * @returns Liste des tâches
 */
export async function getTasksByProject(projectId: string) {
  try {
    const tasks = await prisma.task.findMany({
      where: { projectId },
      orderBy: { deadline: "asc" },
    });
    return tasks;
  } catch (err) {
    throw new Error(err as string);
  }
}

/**
 * Récupère une tâche par son ID
 * @param taskId ID de la tâche à récupérer
 * @returns Tâche trouvée ou undefined
 */
export async function getTaskById(taskId: string) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });
    return task;
  } catch (err) {
    throw new Error(err as string);
  }
}
