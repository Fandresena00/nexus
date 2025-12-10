"use client";

import { deleteProject } from "@/app/actions/project-action";
import { Settings2, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuContent,
} from "../dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../button";
import { deleteTaskByProject } from "@/app/actions/task-actions";

export default function ProjectOption({
  projectId,
  projectTitle,
}: {
  projectId: string;
  projectTitle: string;
}) {
  const router = useRouter();

  const HandleDeleteProject = async () => {
    try {
      toast.message(`project ${projectTitle} has been deleted`);
      await deleteTaskByProject(projectId);
      await deleteProject(projectId);
      router.refresh();
    } catch (err) {
      console.log(`error on deleted project : ${err}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          <Settings2 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={HandleDeleteProject}
            className="group transition-all"
          >
            <Trash2 className="group-hover:text-red-500 transition-all" />
            <span className="tracking-wide">delete</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="group transition-all">
            <Pencil className="group-hover:text-blue-500 transition-all" />
            <span className="tracking-wide">update</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
