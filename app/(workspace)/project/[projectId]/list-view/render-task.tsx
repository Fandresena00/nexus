"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "@/generated/prisma/client";
import { updateTaskStatus } from "@/app/actions/task-actions";
import { TaskStatus } from "@/generated/prisma/enums";
import DeleteTask from "@/components/actions/delete-task";

export default function RenderTask({
  task,
  projectId,
  userId,
  userRole,
}: {
  task: Task;
  projectId: string;
  userId: string;
  userRole: "OWNER" | "EDITOR" | "VIEWER" | null;
}) {
  const canEdit = userRole === "OWNER" || userRole === "EDITOR";

  const handleStatusChange = async (newStatus: TaskStatus) => {
    if (!canEdit) return;
    try {
      await updateTaskStatus(task.id, userId, newStatus);
      // Optionally add toast notification here
    } catch (error) {
      console.error("Failed to update task status:", error);
      // Optionally show error toast here
    }
  };

  return (
    <Card className="grid grid-cols-2 rounded-none hover:shadow-xl transition-all">
      <CardHeader className="flex items-center">
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-3">
        <div className="flex gap-2 items-center">
          {task.tag.map((e) => (
            <Badge key={e}>{e}</Badge>
          ))}
        </div>
        {canEdit ? (
          <Select onValueChange={handleStatusChange} value={task.taskStatus}>
            <SelectTrigger>
              <SelectValue>{task.taskStatus}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TO_DO">To Do</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="REVIEW">In Review</SelectItem>
              <SelectItem value="DONE">Done</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Badge variant="outline">{task.taskStatus}</Badge>
        )}
        <h3 className="flex text-sm items-center gap-10 justify-center">
          <span> {task.deadline.toDateString()}</span>
          {canEdit && (
            <DeleteTask
              taskId={task.id}
              projectId={projectId}
              userId={userId}
              userRole={userRole}
            />
          )}
        </h3>
      </CardContent>
    </Card>
  );
}
