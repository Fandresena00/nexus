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

  return (
    <div
      draggable={canEdit} // Only draggable if user can edit
      onDragStart={canEdit ? (e) => onDragStart(e, task) : undefined}
      onDragEnd={canEdit ? onDragEnd : undefined}
      className={canEdit ? "cursor-grab" : "cursor-default"}
    >
      <Card className="rounded-none hover:shadow-xl transition-all">
        <CardHeader>
          <CardDescription className="flex justify-between items-center">
            <span>{task.description}</span>
            {canEdit && (
              <DeleteTask
                taskId={task.id}
                projectId={projectId}
                userId={userId}
                userRole={userRole}
              />
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
