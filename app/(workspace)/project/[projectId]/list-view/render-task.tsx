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
import { AlertCircle, Circle, AlertTriangle, Calendar } from "lucide-react";
import EditTaskForm from "@/components/form/edit-task-form";

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
    } catch (error) {
      console.error("Failed to update task status:", error);
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

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "TODO":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "IN_PROGRESS":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "REVIEW":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "DONE":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300 dark">
      {/* Priority indicator line */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          task.priority === "HIGH"
            ? "bg-linear-to-b from-red-500 to-red-600"
            : task.priority === "MEDIUM"
              ? "bg-linear-to-b from-yellow-500 to-yellow-600"
              : "bg-linear-to-b from-green-500 to-green-600"
        }`}
      />

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Section - Description & Priority */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4">
          <CardDescription className="flex-1 text-foreground text-sm pr-4">
            {task.description}
          </CardDescription>

          {canEdit ? (
            <div className="relative group/select">
              <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-secondary rounded-lg opacity-0 group-hover/select:opacity-20 blur transition-all duration-300" />
              <Select
                onValueChange={handlePriorityChange}
                value={task.priority}
                defaultValue={task.priority}
              >
                <SelectTrigger className="relative w-32 h-8 bg-muted/50 border-border">
                  <SelectValue>
                    <div className="flex items-center gap-1.5">
                      {getPriorityIcon(task.priority)}
                      <span className="text-xs uppercase">{task.priority}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-3 h-3 text-red-400" />
                      <span>High</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="MEDIUM">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-yellow-400" />
                      <span>Medium</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="LOW">
                    <div className="flex items-center gap-2">
                      <Circle className="w-3 h-3 text-green-400" />
                      <span>Low</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <Badge
              variant="outline"
              className={`${getPriorityColor(task.priority)} flex items-center gap-1.5 text-xs`}
            >
              {getPriorityIcon(task.priority)}
              <span className="uppercase">{task.priority}</span>
            </Badge>
          )}
        </CardHeader>

        {/* Right Section - Tags, Status, Deadline */}
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center py-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {task.tag.length > 0 ? (
              task.tag.map((e) => (
                <Badge
                  key={e}
                  className="bg-secondary/20 text-secondary border-secondary/30 hover:bg-secondary/30 transition-colors duration-300 text-xs"
                >
                  {e}
                </Badge>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">No tags</span>
            )}
          </div>

          {/* Status */}
          {canEdit ? (
            <div className="relative group/select">
              <Select
                onValueChange={handleStatusChange}
                value={task.taskStatus}
              >
                <SelectTrigger className="relative bg-muted/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black text-gray-300">
                  <SelectItem value="TODO">To Do</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="REVIEW">In Review</SelectItem>
                  <SelectItem value="DONE">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <Badge
              variant="outline"
              className={getStatusColor(task.taskStatus)}
            >
              {task.taskStatus.replace("_", " ")}
            </Badge>
          )}

          {/* Deadline & Actions */}
          <div className="flex items-center justify-between gap-3">
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
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
