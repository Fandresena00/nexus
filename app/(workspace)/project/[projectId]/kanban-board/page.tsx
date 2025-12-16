import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import KanbanBoard from "./kanban-board";
import prisma from "@/lib/prisma";
import { KanbanSquareIcon, Search, ListCollapse, Layout } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NewTaskForm from "@/components/form/new-task-form";
import Link from "next/link";
import { getUserProjectRole } from "@/app/actions/project-action";

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

  const allTasks = await prisma.task.findMany({
    where: { projectId },
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
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-linear-to-br from-primary to-secondary border border-primary/50 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <KanbanSquareIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">
                  Kanban Board
                </span>
                <div className="h-px w-24 bg-linear-to-r from-primary to-transparent mt-1" />
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
            <form className="relative flex items-center flex-1 max-w-md">
              <div className="relative w-full group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-secondary rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
                <div className="relative flex">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                  <Input
                    placeholder="Search tasks..."
                    className="w-full text-gray-300 pl-10 bg-muted/50 border-border focus:border-primary/50 transition-all duration-300"
                  />
                </div>
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Link href={`/project/${projectId}/list-view`}>
                <Button
                  variant="outline"
                  className="text-gray-300 border-secondary/30 hover:bg-secondary/10 hover:border-secondary/50 hover:text-secondary transition-all duration-300"
                >
                  <ListCollapse className="w-4 h-4" />
                  <span>List View</span>
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
                className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                style={{
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
              <span className="text-muted-foreground">Total Tasks:</span>
              <span className="font-semibold text-foreground">
                {allTasks.length}
              </span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-muted-foreground">Done:</span>
              <span className="font-semibold text-foreground">
                {allTasks.filter((t) => t.taskStatus === "DONE").length}
              </span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="text-muted-foreground">In Progress:</span>
              <span className="font-semibold text-foreground">
                {allTasks.filter((t) => t.taskStatus === "IN_PROGRESS").length}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Kanban Board */}
      <KanbanBoard
        initialTasks={allTasks}
        projectId={projectId}
        userId={session.id}
        userRole={userRole}
      />
    </div>
  );
}
