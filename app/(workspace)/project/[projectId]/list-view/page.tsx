import { getTasksByProject } from "@/app/actions/task-actions";
import NewTaskForm from "@/components/form/new-task-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSession } from "@/lib/auth-server";
import prisma from "@/lib/prisma";
import { Search, ListChecks, KanbanSquare } from "lucide-react";
import { redirect } from "next/navigation";
import TaskList from "./task-list";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  const { projectId } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  const tasks = await getTasksByProject(projectId);

  return (
    <div className="p-8">
      {/** Navigation */}
      <nav className="flex flex-col gap-2.5 px-12 py-3">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{project?.title}</h1>
          <h3 className="flex gap-2.5 items-center">
            <ListChecks size={50} className="text-blue-500" />
            <span className="text-xl font-bold">View list mode</span>
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
            <Link href={`/project/${projectId}/kanban-board`}>
              <Button>
                <KanbanSquare />
                <span>Kanban</span>
              </Button>
            </Link>
            <NewTaskForm projectId={projectId} userId={session.id} />
          </div>
        </div>
      </nav>

      <TaskList
        initialTasks={tasks}
        userId={session.id}
        projectId={projectId}
      />
    </div>
  );
}
