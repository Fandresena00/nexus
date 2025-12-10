"use client";

import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../dropdown-menu";
import { Pencil, Settings2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteTask } from "@/app/actions/task-actions";
import { useRouter } from "next/navigation";
import { Button } from "../button";

export default function TaskOption({
  taskId,
  taskTitle,
}: {
  taskId: string;
  taskTitle: string;
}) {
  const router = useRouter();

  const HandleDeleteProject = async () => {
    try {
      await deleteTask(taskId);
      router.refresh();
      toast.message(`task ${taskTitle} has been deleted`);
    } catch (err) {
      console.log(`error on deleted task : ${err}`);
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
            <span className="tracking-wide">edit</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
