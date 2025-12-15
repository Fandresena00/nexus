"use client";

import DeleteTask from "@/components/actions/delete-task";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Task } from "@/generated/prisma/client";
import { TaskPriority } from "@/generated/prisma/enums";
import {
  AlertCircle,
  Circle,
  AlertTriangle,
  Calendar,
  GripVertical,
} from "lucide-react";
import EditTaskForm from "@/components/form/edit-task-form";

export function RenderTasks({
  task,
  projectId,
  userId,
  userRole,
  onDragStart,
  onDragEnd,
}: {
  task: Task;
  projectId: string;
  userId: string;
  userRole: "OWNER" | "EDITOR" | "VIEWER" | null;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDragEnd: (e: React.DragEvent) => void;
}) {
  const canEdit = userRole === "OWNER" || userRole === "EDITOR";

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "MEDIUM":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "LOW":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getPriorityIcon = (priority: TaskPriority) => {
    switch (priority) {
      case "HIGH":
        return <AlertCircle className="w-3 h-3" />;
      case "MEDIUM":
        return <AlertTriangle className="w-3 h-3" />;
      case "LOW":
        return <Circle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div
      draggable={canEdit}
      onDragStart={canEdit ? (e) => onDragStart(e, task) : undefined}
      onDragEnd={canEdit ? onDragEnd : undefined}
      className={`group relative ${canEdit ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
    >
      {/* Drag indicator */}
      {canEdit && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
      )}

      <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300 dark">
        {/* Neon top border based on priority */}
        <div
          className={`absolute top-0 left-0 right-0 h-px ${
            task.priority === "HIGH"
              ? "bg-linear-to-r from-transparent via-red-500 to-transparent"
              : task.priority === "MEDIUM"
                ? "bg-linear-to-r from-transparent via-yellow-500 to-transparent"
                : "bg-linear-to-r from-transparent via-green-500 to-transparent"
          } opacity-50`}
        />

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <CardHeader className="relative pb-3">
          <CardDescription className="flex justify-between items-start gap-2">
            <span className="flex-1 text-gray-300 text-sm leading-relaxed">
              {task.description}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <Badge
                variant="outline"
                className={`${getPriorityColor(task.priority)} flex items-center gap-1.5 text-xs`}
              >
                {getPriorityIcon(task.priority)}
                <span className="uppercase">{task.priority}</span>
              </Badge>
            </div>
          </CardDescription>
        </CardHeader>

        <Separator className="bg-border/50" />

        <CardContent className="relative flex justify-between pt-3 pb-3">
          <div>
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {task.tag.map((e) => (
                <Badge
                  key={e}
                  className="bg-secondary/20 text-secondary border-secondary/30 hover:bg-secondary/30 transition-colors duration-300 text-xs"
                >
                  {e}
                </Badge>
              ))}
            </div>

            {/* Deadline */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>
                {task.deadline.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          <CardAction>
            {/* Action buttons */}
            {canEdit && (
              <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <EditTaskForm task={task} userId={userId} />
                <DeleteTask
                  taskId={task.id}
                  projectId={projectId}
                  userId={userId}
                  userRole={userRole}
                />
              </div>
            )}
          </CardAction>
        </CardContent>
      </Card>
    </div>
  );
}
