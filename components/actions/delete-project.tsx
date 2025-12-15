"use client";

import { deleteProject } from "@/app/actions/project-action";
import { Trash2, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { deleteTaskByProject } from "@/app/actions/task-actions";
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

export default function DeleteProject({
  projectId,
  projectTitle,
}: {
  projectId: string;
  projectTitle: string;
}) {
  const router = useRouter();

  const HandleDeleteProject = async () => {
    try {
      await deleteTaskByProject(projectId);
      await deleteProject(projectId);
      toast.message(`Delete project`, {
        description: `project ${projectTitle} has been deleted`,
      });
      router.refresh();
      router.push("/project");
    } catch (err) {
      console.log(`error on deleted project : ${err}`);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="text-gray-300 border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all duration-300 group dark"
        >
          <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300 transition-colors duration-300" />
          <span>Delete Project</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-card/95 backdrop-blur-xl border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)] dark">
        {/* Neon glow overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-red-500/5 via-transparent to-red-600/5 pointer-events-none rounded-lg" />

        <AlertDialogHeader className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-linear-to-br from-red-500 to-red-600 border border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <AlertDialogTitle className="text-2xl bg-linear-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Delete Project
              </AlertDialogTitle>
              <div className="h-px w-24 bg-linear-to-r from-red-500 to-transparent mt-1" />
            </div>
          </div>

          <AlertDialogDescription className="text-muted-foreground pt-2">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-red-400">{projectTitle}</span>?
            <br />
            <span className="text-red-400/80">
              This action cannot be undone. All tasks and data will be
              permanently deleted.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="relative gap-3">
          <AlertDialogCancel className="text-gray-300 border-border hover:bg-muted hover:border-primary/30 transition-all duration-300">
            Cancel
          </AlertDialogCancel>

          <div className="relative group">
            <div
              className="absolute -inset-1 bg-linear-to-r from-red-500 to-red-600 rounded-lg opacity-70 group-hover:opacity-100 blur transition-all duration-300"
              style={{
                animation: "pulse-danger 2s ease-in-out infinite",
              }}
            />
            <AlertDialogAction
              onClick={HandleDeleteProject}
              className="relative bg-linear-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white border border-red-400/50 shadow-lg transition-all duration-300"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Forever
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
