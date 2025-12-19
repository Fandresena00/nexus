import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth-server";
import prisma from "@/lib/prisma";
import { ListChecks, KanbanSquare, Layout } from "lucide-react";
import { redirect } from "next/navigation";
import TaskList from "./task-list";
import Link from "next/link";
import { getUserProjectRole } from "@/app/actions/project-action";
import NewTaskForm from "@/components/form/task/new-task-form";
import SearchParams from "@/components/form/search-params";

type Props = {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function page({ params, searchParams }: Props) {
  const { projectId } = await params;
  const resultSearchParams = await searchParams;
  const search = resultSearchParams.search;

  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  if (!session.emailVerified) {
    redirect("/verify-email");
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  // Check if user has access to this project
  const userRole = await getUserProjectRole(projectId, session.id);
  if (!userRole) {
    redirect("/project");
  }

  const tasks = await prisma.task.findMany({
    where: {
      projectId,
      AND: [
        search
          ? {
              description: {
                contains: search,
                mode: "insensitive",
              },
            }
          : {},
      ],
    },
    orderBy: { deadline: "asc" },
  });
  const canEdit = userRole === "OWNER" || userRole === "EDITOR";

  return (
    <div className="min-h-screen dark">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-20 bg-background/80 border-b border-border backdrop-blur-xl">
        <div className="px-6 lg:px-12 py-4">
          {/* Title Section */}
          <div
            className="flex flex-col gap-3 mb-4"
            style={{
              animation:
                "fade-in-down 0.5s cubic-bezier(0.2, 0, 0, 1) forwards",
            }}
          >
            <h1 className="text-3xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {project?.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-linear-to-br from-secondary to-accent border border-secondary/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <ListChecks className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">
                  List View
                </span>
                <div className="h-px w-20 bg-linear-to-r from-secondary to-transparent mt-1" />
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
            style={{
              animation:
                "fade-in-up 0.5s cubic-bezier(0.2, 0, 0, 1) 0.1s forwards",
              opacity: 0,
            }}
          >
            {/* Search Bar */}
            <SearchParams />

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Link href={`/project/${projectId}/kanban-board`}>
                <Button
                  variant="outline"
                  className="text-gray-300 border-primary/30 hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-300"
                >
                  <KanbanSquare className="w-4 h-4" />
                  <span>Kanban</span>
                </Button>
              </Link>

              <Link href={`/project/${projectId}`}>
                <Button
                  variant="outline"
                  className="text-gray-300 border-accent/30 hover:bg-accent/10 hover:border-accent/50 hover:text-accent transition-all duration-300"
                >
                  <Layout className="w-4 h-4" />
                  <span>Overview</span>
                </Button>
              </Link>

              {canEdit && (
                <NewTaskForm projectId={projectId} userId={session.id} />
              )}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="border-t border-border bg-muted/30 px-6 lg:px-12 py-3">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                style={{
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
              <span className="text-muted-foreground">Total Tasks:</span>
              <span className="font-semibold text-foreground">
                {tasks.length}
              </span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-muted-foreground">Completed:</span>
              <span className="font-semibold text-foreground">
                {tasks.filter((t) => t.taskStatus === "DONE").length}
              </span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="text-muted-foreground">In Progress:</span>
              <span className="font-semibold text-foreground">
                {tasks.filter((t) => t.taskStatus === "IN_PROGRESS").length}
              </span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-muted-foreground">To Do:</span>
              <span className="font-semibold text-foreground">
                {tasks.filter((t) => t.taskStatus === "TODO").length}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Task List */}
      <div className="px-6 lg:px-12 py-6">
        <TaskList
          initialTasks={tasks}
          userId={session.id}
          projectId={projectId}
          userRole={userRole}
        />
      </div>
    </div>
  );
}
