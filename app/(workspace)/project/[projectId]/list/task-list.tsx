"use client";

import { TaskStatus } from "@/generated/prisma/enums";
import { updateTaskStatus, deleteTask } from "@/app/actions/task-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import ConfirmDialog from "@/src/components/personnal/confirm-dialog";

type Task = {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  taskStatus: TaskStatus;
};

type TaskListProps = {
  tasks: Task[];
  projectId: string;
};

function getStatusBadgeStyle(status: TaskStatus) {
  switch (status) {
    case "TODO":
      return "bg-gray-200 text-gray-900 border-gray-300";
    case "IN_PROGRESS":
      return "bg-blue-200 text-blue-900 border-blue-300";
    case "REVIEW":
      return "bg-yellow-200 text-yellow-900 border-yellow-300";
    case "DONE":
      return "bg-green-200 text-green-900 border-green-300";
    default:
      return "bg-gray-200 text-gray-900 border-gray-300";
  }
}

const statusOptions = [
  { value: TaskStatus.TODO, label: "À faire" },
  { value: TaskStatus.IN_PROGRESS, label: "En cours" },
  { value: TaskStatus.REVIEW, label: "En révision" },
  { value: TaskStatus.DONE, label: "Terminé" },
];

export default function TaskList({ tasks, projectId }: TaskListProps) {
  const router = useRouter();
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    taskId: string;
    taskTitle: string;
  } | null>(null);

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    setUpdatingTaskId(taskId);
    try {
      await updateTaskStatus(taskId, newStatus);
      router.refresh();
    } catch (error) {
      console.error("Error updating task status:", error);
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const handleDeleteClick = (taskId: string, taskTitle: string) => {
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

  if (tasks.length === 0) {
    return (
      <li className="text-gray-500">Aucune tâche trouvée pour ce projet.</li>
    );
  }

  return (
    <>
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
      {tasks.map((task) => (
        <li
          key={task.id}
          className="border rounded px-4 py-3 shadow-sm bg-white"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="font-semibold flex-1">{task.title}</div>
            <div className="flex items-center gap-2">
              <select
                value={task.taskStatus}
                onChange={(e) =>
                  handleStatusChange(task.id, e.target.value as TaskStatus)
                }
                disabled={
                  updatingTaskId === task.id || deletingTaskId === task.id
                }
                className={`h-7 px-2 rounded-sm text-[11px] font-bold tracking-wide border cursor-pointer transition-opacity outline-none focus:ring-2 focus:ring-offset-1 ${getStatusBadgeStyle(
                  task.taskStatus,
                )} ${
                  updatingTaskId === task.id || deletingTaskId === task.id
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-80"
                }`}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Link
                href={`/project/${projectId}/task/${task.id}/edit`}
                className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                title="Modifier la tâche"
              >
                <Pencil size={16} />
              </Link>
              <button
                onClick={() => handleDeleteClick(task.id, task.title)}
                disabled={
                  deletingTaskId === task.id || updatingTaskId === task.id
                }
                className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Supprimer la tâche"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          {task.description && (
            <div className="text-sm text-gray-600 mt-1">{task.description}</div>
          )}
          {task.deadline && (
            <div className="text-xs text-gray-400 mt-2">
              Date limite : {new Date(task.deadline).toLocaleDateString()}
            </div>
          )}
        </li>
      ))}
    </>
  );
}
