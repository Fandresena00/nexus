"use client";

import { Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { deleteTask } from "@/app/actions/task-actions";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function DeleteTask({
  taskId,
  projectId,
  userId,
  userRole,
}: {
  taskId: string;
  projectId: string;
  userId: string;
  userRole: "OWNER" | "EDITOR" | "VIEWER" | null;
}) {
  const router = useRouter();

  const HandleDeleteTask = async () => {
    try {
      await deleteTask(taskId, projectId, userId);
      toast.message("Delete task", {
        description: `Task has been deleted successfully`,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete task";
      toast.error(message);
    } finally {
      router.refresh();
    }
  };

  // Only show options if user can edit
  if (!userRole || userRole === "VIEWER") {
    return null;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 dark"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-card/95 backdrop-blur-xl border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)] dark">
        {/* Neon glow overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-red-500/5 via-transparent to-red-600/5 pointer-events-none rounded-lg" />

        <AlertDialogHeader className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-red-500 to-red-600 border border-red-400/50 shadow-[0_0_15px_rgba(239,68,68,0.4)]">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <AlertDialogTitle className="text-xl bg-linear-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Delete Task
              </AlertDialogTitle>
              <div className="h-px w-16 bg-linear-to-r from-red-500 to-transparent mt-1" />
            </div>
          </div>

          <AlertDialogDescription className="text-muted-foreground pt-2">
            Are you sure you want to delete this task?
            <br />
            <span className="text-red-400/80">
              This action cannot be undone.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="relative gap-3">
          <AlertDialogCancel className="text-gray-300 border-border hover:bg-muted hover:border-primary/30 transition-all duration-300">
            Cancel
          </AlertDialogCancel>

          <div className="relative group">
            <div
              className="absolute -inset-0.5 bg-linear-to-r from-red-500 to-red-600 rounded-lg opacity-70 group-hover:opacity-100 blur transition-all duration-300"
              style={{
                animation: "pulse-danger 2s ease-in-out infinite",
              }}
            />
            <AlertDialogAction
              onClick={HandleDeleteTask}
              className="relative bg-linear-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white border border-red-400/50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
