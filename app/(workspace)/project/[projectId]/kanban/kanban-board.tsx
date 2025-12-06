"use client";

import { useState } from "react";
import TaskCard from "@/src/components/personnal/task/task-card";
import TaskColumn from "@/src/components/personnal/task/task-column";
import { TaskStatus } from "@/generated/prisma/enums";
import { updateTaskStatus, deleteTask } from "@/app/actions/task-actions";
import { useRouter } from "next/navigation";
import { Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import ConfirmDialog from "@/src/components/personnal/confirm-dialog";

type Task = {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  taskStatus: TaskStatus;
  tag: string[];
};

type KanbanBoardProps = {
  tasks: Task[];
  projectId: string;
};

const statusMap: Record<string, TaskStatus> = {
  "to do": TaskStatus.TODO,
  "in progress": TaskStatus.IN_PROGRESS,
  review: TaskStatus.REVIEW,
  done: TaskStatus.DONE,
};

export default function KanbanBoard({ tasks, projectId }: KanbanBoardProps) {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [draggedOverColumn, setDraggedOverColumn] = useState<string | null>(
    null,
  );
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    taskId: string;
    taskTitle: string;
  } | null>(null);
  const router = useRouter();

  // Filter tasks by status
  const todoTasks = tasks.filter((task) => task.taskStatus === TaskStatus.TODO);
  const inProgressTasks = tasks.filter(
    (task) => task.taskStatus === TaskStatus.IN_PROGRESS,
  );
  const reviewTasks = tasks.filter(
    (task) => task.taskStatus === TaskStatus.REVIEW,
  );
  const doneTasks = tasks.filter((task) => task.taskStatus === TaskStatus.DONE);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", taskId);
    // Add visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "0.5";
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "1";
    }
    setDraggedTaskId(null);
  };

  const handleDragOver = (e: React.DragEvent, columnTitle: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDraggedOverColumn(columnTitle);
  };

  const handleDragLeave = () => {
    setDraggedOverColumn(null);
  };

  const handleDrop = async (e: React.DragEvent, columnTitle: string) => {
    e.preventDefault();
    setDraggedOverColumn(null);
    const taskId = e.dataTransfer.getData("text/plain");

    if (!taskId || !statusMap[columnTitle]) {
      return;
    }

    const newStatus = statusMap[columnTitle];

    // Find the task to check current status
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.taskStatus === newStatus) {
      return;
    }

    try {
      await updateTaskStatus(taskId, newStatus);
      router.refresh();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDeleteClick = (
    taskId: string,
    taskTitle: string,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation(); // Prevent drag from starting when clicking delete
    setConfirmDialog({
      isOpen: true,
      taskId,
      taskTitle,
    });
  };

  const handleConfirmDelete = async () => {
    if (!confirmDialog) return;

    setDeletingTaskId(confirmDialog.taskId);
    setConfirmDialog(null);

    try {
      await deleteTask(confirmDialog.taskId);
      router.refresh();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Erreur lors de la suppression de la tâche");
    } finally {
      setDeletingTaskId(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDialog(null);
  };

  const renderTasks = (taskList: Task[]) => {
    return taskList.map((task) => (
      <div
        key={task.id}
        draggable={deletingTaskId !== task.id}
        onDragStart={(e) => handleDragStart(e, task.id)}
        onDragEnd={handleDragEnd}
        className={`cursor-move transition-opacity relative ${
          draggedTaskId === task.id ? "opacity-50" : ""
        } ${deletingTaskId === task.id ? "opacity-50" : ""}`}
      >
        <TaskCard
          taskId={task.id}
          title={task.title}
          description={task.description}
          days={task.deadline.getDate().toString().padStart(2, "0")}
          month={task.deadline.toLocaleString("default", { month: "short" })}
          years={task.deadline.getFullYear().toString()}
          tags={task.tag}
        />
        <div className="absolute top-2 right-2 flex gap-1 z-10">
          <Link
            href={`/project/${projectId}/task/${task.id}/edit`}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors bg-white shadow-sm border border-gray-200"
            title="Modifier la tâche"
          >
            <Pencil size={14} />
          </Link>
          <button
            onClick={(e) => handleDeleteClick(task.id, task.title, e)}
            disabled={deletingTaskId === task.id}
            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm border border-gray-200"
            title="Supprimer la tâche"
            onMouseDown={(e) => e.stopPropagation()} // Prevent drag when clicking delete
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="flex flex-1 pb-6 pr-3.5 gap-3.5">
        {/** To Do Column */}
        <TaskColumn
          title="to do"
          onDragOver={(e) => handleDragOver(e, "to do")}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, "to do")}
          isDraggedOver={draggedOverColumn === "to do"}
        >
          {renderTasks(todoTasks)}
        </TaskColumn>
        {/** In Progress Column */}
        <TaskColumn
          title="in progress"
          onDragOver={(e) => handleDragOver(e, "in progress")}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, "in progress")}
          isDraggedOver={draggedOverColumn === "in progress"}
        >
          {renderTasks(inProgressTasks)}
        </TaskColumn>
        {/** Review column */}
        <TaskColumn
          title="review"
          onDragOver={(e) => handleDragOver(e, "review")}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, "review")}
          isDraggedOver={draggedOverColumn === "review"}
        >
          {renderTasks(reviewTasks)}
        </TaskColumn>
        {/** Done column */}
        <TaskColumn
          title="done"
          onDragOver={(e) => handleDragOver(e, "done")}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, "done")}
          isDraggedOver={draggedOverColumn === "done"}
        >
          {renderTasks(doneTasks)}
        </TaskColumn>
      </div>

      {/** Confirmation Dialog */}
      {confirmDialog && (
        <ConfirmDialog
          isOpen={confirmDialog.isOpen}
          title="Supprimer la tâche"
          message={`Êtes-vous sûr de vouloir supprimer la tâche "${confirmDialog.taskTitle}" ?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          confirmText="Supprimer"
          cancelText="Annuler"
        />
      )}
    </>
  );
}
