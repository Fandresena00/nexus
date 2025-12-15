import { getSession } from "@/lib/auth-server";
import prisma from "@/lib/prisma";

import {
  Calendar,
  CheckCircle2,
  FileBarChart2,
  Search,
  TrendingUp,
  Clock,
} from "lucide-react";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import NewProjectForm from "../../../components/form/new-project-form";
import { Input } from "@/components/ui/input";

export default async function page() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  const projects = await prisma.project.findMany({
    where: {
      OR: [
        {
          userId: session.id,
        },
        {
          access: {
            some: {
              userId: session.id,
            },
          },
        },
      ],
    },
  });

  const progression = async (ProjectId: string) => {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: ProjectId,
      },
    });
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
      (task) => task.taskStatus === "DONE",
    ).length;
    const progress =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return progress;
  };

  const projectWithProgress = await Promise.all(
    projects.map(async (project) => ({
      ...project,
      progress: await progression(project.id),
    })),
  );

  return (
    <div className="relative min-h-screen dark">
      {/* Project Navbar */}
      <nav className="sticky top-0 z-20 bg-background/80 border-b border-border backdrop-blur-xl">
        <div className="flex items-center justify-between px-8 py-4">
          {/* Title with neon effect */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-primary to-secondary border border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <FileBarChart2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Projects
              </h1>
              <div className="h-px w-16 bg-linear-to-r from-primary to-transparent" />
            </div>
          </div>

          {/* Search and Create */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-secondary rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 w-64 bg-muted/50 text-gray-300 border-border focus:border-primary/50 transition-all duration-300"
                />
              </div>
            </div>

            {/* Create Button */}
            <NewProjectForm userId={session.id} />
          </div>
        </div>

        {/* Stats Bar */}
        {projectWithProgress.length > 0 && (
          <div className="border-t border-border bg-muted/30 px-8 py-3">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                  style={{
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  }}
                />
                <span className="text-muted-foreground">Total Projects:</span>
                <span className="font-semibold text-foreground">
                  {projectWithProgress.length}
                </span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                <span className="text-muted-foreground">Active:</span>
                <span className="font-semibold text-foreground">
                  {projectWithProgress.filter((p) => p.progress < 100).length}
                </span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                <span className="text-muted-foreground">Completed:</span>
                <span className="font-semibold text-foreground">
                  {projectWithProgress.filter((p) => p.progress === 100).length}
                </span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Projects Grid */}
      <div
        className={
          projectWithProgress.length > 0
            ? "p-8"
            : "h-[80vh] flex items-center justify-center"
        }
      >
        {projectWithProgress.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projectWithProgress.map((project, index) => (
              <Card
                key={project.id}
                className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]"
                style={{
                  animation: `fade-in-up 0.5s cubic-bezier(0.2, 0, 0, 1) ${index * 0.1}s forwards`,
                  opacity: 0,
                }}
              >
                {/* Neon hover effect */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Progress indicator line */}
                <div
                  className="absolute top-0 left-0 h-1 bg-linear-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />

                <CardHeader className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors duration-300 truncate">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-muted-foreground">
                        {project.description}
                      </CardDescription>
                    </div>

                    {/* Status Badge */}
                    <Badge
                      variant={
                        project.progress >= 100 ? "default" : "secondary"
                      }
                      className={
                        project.progress >= 100
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-primary/20 text-primary border-primary/30"
                      }
                    >
                      {project.progress >= 100 ? "Complete" : "Active"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="relative space-y-4">
                  {/* Progress Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-primary" />
                        Progress
                      </span>
                      <Badge
                        variant="outline"
                        className={`font-bold ${
                          project.progress >= 75
                            ? "bg-green-500/10 text-green-400 border-green-500/30"
                            : project.progress >= 50
                              ? "bg-primary/10 text-primary border-primary/30"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {project.progress}%
                      </Badge>
                    </div>
                    <Progress
                      value={project.progress}
                      className="h-2 bg-muted"
                    />
                  </div>

                  {/* Info Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Deadline */}
                    <div className="group/card relative overflow-hidden rounded-lg bg-secondary/10 border border-secondary/20 p-3 hover:bg-secondary/20 transition-all duration-300">
                      <div className="absolute inset-0 bg-linear-to-br from-secondary/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-center gap-2 mb-1">
                        <Calendar className="w-3.5 h-3.5 text-secondary" />
                        <span className="text-xs font-medium text-muted-foreground">
                          Deadline
                        </span>
                      </div>
                      <p className="relative text-sm font-bold text-foreground">
                        {project.deadline.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="group/card relative overflow-hidden rounded-lg bg-accent/10 border border-accent/20 p-3 hover:bg-accent/20 transition-all duration-300">
                      <div className="absolute inset-0 bg-linear-to-br from-accent/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-center gap-2 mb-1">
                        {project.progress >= 100 ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-accent" />
                        )}
                        <span className="text-xs font-medium text-muted-foreground">
                          Status
                        </span>
                      </div>
                      <p className="relative text-sm font-bold text-foreground">
                        {project.progress >= 100 ? "Completed" : "In Progress"}
                      </p>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="relative flex gap-3">
                  <Link href={`/project/${project.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-border hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-300"
                    >
                      Details
                    </Button>
                  </Link>
                  <Link
                    href={`/project/${project.id}/kanban-board`}
                    className="flex-1"
                  >
                    <div className="relative group/btn">
                      <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-secondary rounded-lg opacity-50 group-hover/btn:opacity-100 blur-sm transition-all duration-300" />
                      <Button className="relative w-full bg-linear-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 border border-primary/50">
                        Board
                      </Button>
                    </div>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          // Empty State
          <Empty className="border-2 border-dashed border-border max-w-md mx-auto bg-muted/20 backdrop-blur-sm">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <div className="relative">
                  <div
                    className="absolute inset-0 bg-primary/20 blur-2xl"
                    style={{
                      animation: "pulse-glow 3s ease-in-out infinite",
                    }}
                  />
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br from-primary to-secondary border border-primary/50 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                    <FileBarChart2 className="w-8 h-8 text-white" />
                  </div>
                </div>
              </EmptyMedia>
              <EmptyTitle className="text-xl bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                No Projects Yet
              </EmptyTitle>
              <EmptyDescription className="text-muted-foreground">
                Create your first project to start tracking progress and
                managing tasks efficiently
              </EmptyDescription>
              <EmptyContent className="mt-6">
                <NewProjectForm userId={session.id} />
              </EmptyContent>
            </EmptyHeader>
          </Empty>
        )}
      </div>
    </div>
  );
}
