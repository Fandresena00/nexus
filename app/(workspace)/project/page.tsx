import { getSession } from "@/lib/auth-server";
import prisma from "@/lib/prisma";

import { Calendar, CheckCircle2, FileBarChart2 } from "lucide-react";
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
import ProjectOption from "@/components/actions/delete-project";
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
    // Calculate project progress
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
    <div className="relative">
      {/* Project Navbar */}
      <nav className="sticky top-0 z-20 bg-background/80 border-b border-border backdrop-blur flex items-center justify-between px-8 py-4 mb-2">
        <h1 className="text-2xl font-bold text-foreground">Projects</h1>
        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-3 py-2 w-64"
            />
            <span className="absolute left-2.5 top-2.5 text-muted-foreground pointer-events-none">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M20 20l-3.5-3.5"
                />
              </svg>
            </span>
          </div>
          <NewProjectForm userId={session.id} />
        </div>
      </nav>

      <div
        className={
          projectWithProgress.length > 0
            ? "grid grid-cols-3 gap-6 p-10 "
            : "h-[90vh] flex flex-1 items-center"
        }
      >
        {projectWithProgress.length > 0 ? (
          projectWithProgress.map((project) => (
            <Card
              key={project.id}
              className="group hover:shadow-xl transition-all duration-300 hover:border-secondary"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/** progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700">
                      Progression
                    </span>
                    <Badge
                      variant={project.progress >= 75 ? "default" : "secondary"}
                    >
                      {project.progress}%
                    </Badge>
                  </div>
                  <Progress value={project.progress} className="h-3" />
                </div>

                {/** info */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-3 h-3 text-blue-600" />
                      <span className="text-xs font-medium text-slate-600">
                        Echeance
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">
                      {project.deadline.toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-green-500/10">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                      <span className="text-xs font-medium text-slate-600">
                        Status
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">
                      {project.progress >= 90 ? "termine" : "en cours"}
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end gap-4">
                <Link href={`/project/${project.id}`}>
                  <Button className="w-full">More details</Button>
                </Link>
                <Link href={`/project/${project.id}/kanban-board`}>
                  <Button className="w-full">board</Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Empty className="border-4 border-dashed max-w-96 mx-auto">
            <EmptyHeader>
              <EmptyMedia variant={"icon"}>
                <FileBarChart2 />
              </EmptyMedia>
              <EmptyTitle>Project Empty</EmptyTitle>
              <EmptyDescription>
                Create a project to better track your progress
              </EmptyDescription>
              <EmptyContent>
                <NewProjectForm userId={session.id} />
              </EmptyContent>
            </EmptyHeader>
          </Empty>
        )}
      </div>
    </div>
  );
}
