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
import { FileBarChart2, Circle } from "lucide-react";
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

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.taskStatus === status);
  };

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";

    const target = e.currentTarget as HTMLElement;
    setTimeout(() => {
      target.style.opacity = "0.5";
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    target.classList.add("bg-primary/10", "border-primary/50");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.classList.remove("bg-primary/10", "border-primary/50");
  };

  const handleDrop = async (e: React.DragEvent, newStatus: TaskStatus) => {
    e.preventDefault();

    const target = e.currentTarget as HTMLElement;
    target.classList.remove("bg-primary/10", "border-primary/50");

    if (!draggedTask) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTask.id ? { ...task, taskStatus: newStatus } : task,
      ),
    );

    if (!canEdit) {
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

      if (!result) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === draggedTask.id
              ? { ...task, taskStatus: draggedTask.taskStatus }
              : task,
          ),
        );
        alert("Error updating task status");
      }
    } catch (error) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === draggedTask.id
            ? { ...task, taskStatus: draggedTask.taskStatus }
            : task,
        ),
      );
      console.error("Error:", error);
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "1";
    setDraggedTask(null);
  };

  const columns: { status: TaskStatus; title: string; color: string }[] = [
    {
      status: TaskStatus.TODO,
      title: "TO DO",
      color: "from-red-500/20 to-red-600/20",
    },
    {
      status: TaskStatus.IN_PROGRESS,
      title: "IN PROGRESS",
      color: "from-yellow-500/20 to-yellow-600/20",
    },
    {
      status: TaskStatus.REVIEW,
      title: "IN REVIEW",
      color: "from-blue-500/20 to-blue-600/20",
    },
    {
      status: TaskStatus.DONE,
      title: "DONE",
      color: "from-green-500/20 to-green-600/20",
    },
  ];

  const getColumnBorderColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return "border-red-500/30 hover:border-red-500/50";
      case TaskStatus.IN_PROGRESS:
        return "border-yellow-500/30 hover:border-yellow-500/50";
      case TaskStatus.REVIEW:
        return "border-blue-500/30 hover:border-blue-500/50";
      case TaskStatus.DONE:
        return "border-green-500/30 hover:border-green-500/50";
      default:
        return "border-border";
    }
  };

  return (
    <>
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 min-h-[90vh] w-full px-6 lg:px-10 py-6 dark">
          {columns.map((column, index) => (
            <div
              key={column.status}
              className={`relative rounded-xl border-2 ${getColumnBorderColor(column.status)} bg-muted/20 backdrop-blur-sm transition-all duration-300 overflow-hidden`}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.status)}
              style={{
                animation: `fade-in-up 0.5s cubic-bezier(0.2, 0, 0, 1) ${index * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              {/* Column header gradient */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${column.color}`}
              />

              {/* Header */}
              <div className="flex justify-between items-center px-4 py-4 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Circle className="w-3 h-3 fill-current text-muted-foreground" />
                  <h2 className="text-xs font-bold tracking-wider text-foreground uppercase">
                    {column.title}
                  </h2>
                </div>
                <Badge
                  variant="outline"
                  className="bg-muted/50 border-border text-muted-foreground"
                >
                  {getTasksByStatus(column.status).length}
                </Badge>
              </div>

              {/* Tasks container */}
              <div className="flex flex-col gap-3 p-4 min-h-[200px]">
                {getTasksByStatus(column.status).length > 0 ? (
                  getTasksByStatus(column.status).map((task, taskIndex) => (
                    <div
                      key={task.id}
                      style={{
                        animation: `fade-in-up 0.3s cubic-bezier(0.2, 0, 0, 1) ${taskIndex * 0.05}s forwards`,
                        opacity: 0,
                      }}
                    >
                      <RenderTasks
                        projectId={projectId}
                        task={task}
                        userId={userId}
                        userRole={userRole}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                    <span>No tasks</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[70vh] dark">
          <Empty className="border-2 border-dashed border-border max-w-md mx-auto bg-muted/20 backdrop-blur-sm">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <div className="relative">
                  <div
                    className="absolute inset-0 bg-primary/20 blur-2xl"
                    style={{
                      animation: "pulse-glow 3s ease-in-out infinite",
                    }}
                  />
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary border border-primary/50 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                    <FileBarChart2 className="w-8 h-8 text-white" />
                  </div>
                </div>
              </EmptyMedia>
              <EmptyTitle className="text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                No Tasks Yet
              </EmptyTitle>
              <EmptyDescription className="text-muted-foreground">
                {canEdit
                  ? "Create your first task to start tracking progress"
                  : "No tasks available in this project"}
              </EmptyDescription>
              {canEdit && (
                <EmptyContent className="mt-6">
                  <NewTaskForm userId={userId} projectId={projectId} />
                </EmptyContent>
              )}
            </EmptyHeader>
          </Empty>
        </div>
      )}
    </>
  );
}
