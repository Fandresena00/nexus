"use client";

import DeleteTask from "@/components/actions/delete-task";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Task } from "@/generated/prisma/client";
import { TaskPriority } from "@/generated/prisma/enums";
import { AlertCircle, Circle, AlertTriangle } from "lucide-react";
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
        return "text-red-600 bg-red-50 border-red-200";
      case "MEDIUM":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "LOW":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
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
      draggable={canEdit} // Only draggable if user can edit
      onDragStart={canEdit ? (e) => onDragStart(e, task) : undefined}
      onDragEnd={canEdit ? onDragEnd : undefined}
      className={canEdit ? "cursor-grab" : "cursor-default"}
    >
      <Card className="rounded-none hover:shadow-xl transition-all">
        <CardHeader>
          <CardDescription className="flex justify-between items-center gap-2">
            <span className="flex-1">{task.description}</span>
            <Badge
              variant="outline"
              className={`${getPriorityColor(
                task.priority,
              )} flex items-center gap-1.5 shrink-0`}
            >
              {getPriorityIcon(task.priority)}
              {task.priority}
            </Badge>
            {canEdit && (
              <>
                <EditTaskForm task={task} userId={userId} />
                <DeleteTask
                  taskId={task.id}
                  projectId={projectId}
                  userId={userId}
                  userRole={userRole}
                />
              </>
            )}
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {task.tag.map((e) => (
              <Badge key={e}>{e}</Badge>
            ))}
          </div>
          <h4 className="flex text-xs tracking-wide gap-1.5">
            <span>{task.deadline.toDateString()}</span>
          </h4>
        </CardContent>
      </Card>
    </div>
  );
}
