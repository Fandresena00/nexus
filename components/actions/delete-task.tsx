"use client";

import { Trash2 } from "lucide-react";
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
        description: `one task card has been deleted`,
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
        <Button variant={"ghost"}>
          <Trash2 className="text-red-600" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete task</AlertDialogTitle>
          <AlertDialogDescription>
            Do you really want to delete this task ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={HandleDeleteTask}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
