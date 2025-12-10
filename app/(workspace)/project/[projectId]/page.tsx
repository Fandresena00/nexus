import { getSession } from "@/lib/auth-server";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  CheckCircle2,
  FileBarChart2,
  ImageIcon,
  Edit3,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import EditProjectForm from "@/components/form/edit-project-form";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = await params;

  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      tasks: true,
    },
  });

  if (!project) {
    notFound();
  }

  // Calculate project progress
  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(
    (task) => task.taskStatus === "DONE",
  ).length;
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {project.image ? (
            <Avatar className="w-16 h-16">
              <AvatarImage src={project.image} alt={project.title} />
              <AvatarFallback>
                <ImageIcon className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {project.title}
            </h1>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
        </div>
        <EditProjectForm project={project} />
      </div>

      <Separator />

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <FileBarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Tasks
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deadline</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {project.deadline.toLocaleDateString("fr-FR")}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle>Project Progress</CardTitle>
          <CardDescription>
            Overall completion status of your project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{progress}% Complete</span>
            <Badge variant={progress >= 75 ? "default" : "secondary"}>
              {progress >= 90 ? "Completed" : "In Progress"}
            </Badge>
          </div>
          <Progress value={progress} className="h-3" />
        </CardContent>
      </Card>

      {/* Navigation Section */}
      <Card>
        <CardHeader>
          <CardTitle>Project Views</CardTitle>
          <CardDescription>
            Choose how you want to view and manage your tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href={`/project/${project.id}/kanban-board`}>
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center gap-2"
              >
                <div className="w-6 h-6 bg-blue-500 rounded" />
                <span>Kanban Board</span>
                <span className="text-xs text-muted-foreground">
                  Visual task management
                </span>
              </Button>
            </Link>

            <Link href={`/project/${project.id}/list-view`}>
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center gap-2"
              >
                <div className="w-6 h-6 bg-green-500 rounded" />
                <span>List View</span>
                <span className="text-xs text-muted-foreground">
                  Detailed task list
                </span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Title
              </h3>
              <p className="text-foreground">{project.title}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Description
              </h3>
              <p className="text-foreground">{project.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Created
              </h3>
              <p className="text-foreground">
                {project.createdAt.toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Last Updated
              </h3>
              <p className="text-foreground">
                {project.updatedAt.toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
