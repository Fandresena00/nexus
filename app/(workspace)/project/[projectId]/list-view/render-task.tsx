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
import { updateTaskStatus, updateTask } from "@/app/actions/task-actions";
import { TaskStatus, TaskPriority } from "@/generated/prisma/enums";
import DeleteTask from "@/components/actions/delete-task";
import { AlertCircle, Circle, AlertTriangle } from "lucide-react";

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

  const handlePriorityChange = async (newPriority: TaskPriority) => {
    if (!canEdit) return;
    try {
      await updateTask(task.id, userId, { priority: newPriority });
    } catch (error) {
      console.error("Failed to update task priority:", error);
    }
  };

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
    <Card className="grid grid-cols-2 rounded-none hover:shadow-xl transition-all">
      <CardHeader className="flex items-center gap-3">
        <CardDescription>{task.description}</CardDescription>
        {canEdit ? (
          <Select
            onValueChange={handlePriorityChange}
            value={task.priority}
            defaultValue={task.priority}
          >
            <SelectTrigger className="w-28 h-7">
              <SelectValue>
                <div className="flex items-center gap-1.5">
                  {getPriorityIcon(task.priority)}
                  <span className="text-xs">{task.priority}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HIGH">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-3 h-3 text-red-600" />
                  <span>High</span>
                </div>
              </SelectItem>
              <SelectItem value="MEDIUM">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3 text-yellow-600" />
                  <span>Medium</span>
                </div>
              </SelectItem>
              <SelectItem value="LOW">
                <div className="flex items-center gap-2">
                  <Circle className="w-3 h-3 text-green-600" />
                  <span>Low</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Badge
            variant="outline"
            className={`${getPriorityColor(
              task.priority,
            )} flex items-center gap-1.5`}
          >
            {getPriorityIcon(task.priority)}
            {task.priority}
          </Badge>
        )}
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
