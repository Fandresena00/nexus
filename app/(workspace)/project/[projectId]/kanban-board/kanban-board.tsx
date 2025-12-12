"use client";

import { Badge } from "@/components/ui/badge";
import { RenderTasks } from "./render-tasks";
import { useState } from "react";
import { updateTaskStatus } from "@/app/actions/task-actions";
import { TaskStatus } from "@/generated/prisma/enums";
import { Task } from "@/generated/prisma/client";
import {
  Empty,
  EmptyDescription,
  EmptyTitle,
  EmptyHeader,
  EmptyMedia,
  EmptyContent,
} from "@/components/ui/empty";
import { FileBarChart2 } from "lucide-react";
import NewTaskForm from "@/components/form/new-task-form";

export default function KanbanBoard({
  initialTasks = [],
  userId,
  projectId,
  userRole,
}: {
  initialTasks: Task[];
  userId: string;
  projectId: string;
  userRole: "OWNER" | "EDITOR" | "VIEWER" | null;
}) {
  const canEdit = userRole === "OWNER" || userRole === "EDITOR";
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  // ✅ CORRECTION 1: Utiliser taskStatus au lieu de status
  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.taskStatus === status);
  };

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";

    const target = e.currentTarget as HTMLElement;
    setTimeout(() => {
      target.style.opacity = "0.7";
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    target.classList.add(
      "bg-slate-100",
      "border-2",
      "border-dashed",
      "border-slate-700",
    );
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.classList.remove(
      "bg-slate-100",
      "border-2",
      "border-dashed",
      "border-slate-700",
    );
  };

  // ✅ CORRECTION 2: Paramètre doit être TaskStatus, pas taskStatus
  const handleDrop = async (e: React.DragEvent, newStatus: TaskStatus) => {
    e.preventDefault();

    const target = e.currentTarget as HTMLElement;
    // ✅ CORRECTION 3: Retirer les bonnes classes
    target.classList.remove(
      "bg-slate-100",
      "border-2",
      "border-dashed",
      "border-slate-700",
    );

    if (!draggedTask) return;

    // ✅ CORRECTION 4: Utiliser taskStatus au lieu de status
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTask.id ? { ...task, taskStatus: newStatus } : task,
      ),
    );

    // Mise à jour dans la base de données
    if (!canEdit) {
      // Rollback if user can't edit
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === draggedTask.id
            ? { ...task, taskStatus: draggedTask.taskStatus }
            : task,
        ),
      );
      return;
    }

    try {
      const result = await updateTaskStatus(draggedTask.id, userId, newStatus);

      // ✅ CORRECTION 5: Vérifier si result existe
      if (!result) {
        // Rollback en cas d'erreur
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === draggedTask.id
              ? { ...task, taskStatus: draggedTask.taskStatus }
              : task,
          ),
        );
        alert("Erreur lors de la mise à jour");
      }
    } catch (error) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === draggedTask.id
            ? { ...task, taskStatus: draggedTask.taskStatus }
            : task,
        ),
      );
      throw Error(error as string);
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "1";
    setDraggedTask(null);
  };

  // ✅ CORRECTION 6: Définir les colonnes avec les bons statuts
  const columns: { status: TaskStatus; title: string }[] = [
    { status: TaskStatus.TODO, title: "TO DO" },
    { status: TaskStatus.IN_PROGRESS, title: "IN PROGRESS" },
    { status: TaskStatus.REVIEW, title: "IN REVIEW" },
    { status: TaskStatus.DONE, title: "DONE" },
  ];

  return (
    <>
      {tasks.length > 0 ? (
        <div className="grid grid-cols-4 gap-10 min-h-[90vh] w-full px-10 py-5">
          {columns.map((column) => (
            <div
              key={column.status}
              className="bg-accent transition-all duration-200"
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.status)}
            >
              <div className="flex justify-between px-5 py-3">
                <h2 className="text-sm text-slate-700 font-bold tracking-widest">
                  {column.title}
                </h2>
                <Badge variant="outline">
                  {getTasksByStatus(column.status).length}
                </Badge>
              </div>

              <div className="flex flex-col gap-2.5 px-3 py-2">
                {getTasksByStatus(column.status).map((task) => (
                  <RenderTasks
                    projectId={projectId}
                    key={task.id}
                    task={task}
                    userId={userId}
                    userRole={userRole}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty className="border-4 border-dashed max-w-96 mx-auto my-8">
          <EmptyHeader>
            <EmptyMedia variant={"icon"}>
              <FileBarChart2 />
            </EmptyMedia>
            <EmptyTitle>Task Empty</EmptyTitle>
            <EmptyDescription>
              {canEdit
                ? "Create new task to better track your progress"
                : "No tasks available"}
            </EmptyDescription>
            {canEdit && (
              <EmptyContent>
                <NewTaskForm userId={userId} projectId={projectId} />
              </EmptyContent>
            )}
          </EmptyHeader>
        </Empty>
      )}
    </>
  );
}
