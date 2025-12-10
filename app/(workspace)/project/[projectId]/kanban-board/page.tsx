import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import KanbanBoard from "./kanban-board";
import prisma from "@/lib/prisma";
import { KanbanSquareIcon, Search, ListCollapse } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NewTaskForm from "@/components/form/new-task-form";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  const allTasks = await prisma.task.findMany({
    where: { projectId },
    orderBy: { deadline: "asc" },
  });

  return (
    <div>
      {/** Navigation */}
      <nav className="flex flex-col gap-2.5 px-12 py-3">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{project?.title}</h1>
          <h3 className="flex gap-2.5 items-center">
            <KanbanSquareIcon size={50} className="text-blue-500" />
            <span className="text-xl font-bold">Kanban Board</span>
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <form action="" className="relative flex items-center w-fit">
            <Input className="w-96 pr-12" />
            <Button variant={"secondary"} className="absolute right-0">
              <Search />
            </Button>
          </form>
          <div className="flex gap-3.5 px-10">
            <Link href={`/project/${projectId}/list-view`}>
              <Button>
                <ListCollapse />
                <span>List</span>
              </Button>
            </Link>
            <NewTaskForm projectId={projectId} userId={session.id} />
          </div>
        </div>
      </nav>

      <KanbanBoard
        initialTasks={allTasks}
        projectId={projectId}
        userId={session.id}
      />
    </div>
  );
}
