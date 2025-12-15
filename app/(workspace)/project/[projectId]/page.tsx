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
  Layout,
  List,
  Clock,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import EditProjectForm from "@/components/form/edit-project-form";
import ProjectAccessManager from "@/components/form/project-access-manager";
import {
  getProjectAccess,
  getUserProjectRole,
} from "@/app/actions/project-action";
import Image from "next/image";
import DeleteProject from "@/components/actions/delete-project";

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
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  // Check if user has access to this project
  const userRole = await getUserProjectRole(projectId, session.id);
  if (!userRole) {
    redirect("/project");
  }

  // Fetch project access list
  const accessList = await getProjectAccess(projectId);

  // Calculate project progress
  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(
    (task) => task.taskStatus === "DONE",
  ).length;
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen dark">
      {/* Hero Header Section */}
      <div className="relative border-b border-border bg-linear-to-br from-muted/50 to-background">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"
            style={{
              animation: "float-slow 20s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]"
            style={{
              animation: "float-slower 25s ease-in-out infinite",
            }}
          />
        </div>

        <div className="relative container mx-auto p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-start gap-6">
            {/* Project Image */}
            {project.image ? (
              <div className="relative group w-full lg:w-96 h-64 rounded-xl overflow-hidden border border-primary/30 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10" />
                <Image
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  src={project.image}
                  alt={project.title}
                />
              </div>
            ) : (
              <div className="w-full lg:w-96 h-64 rounded-xl bg-linear-to-br from-muted to-muted/50 flex items-center justify-center border border-border">
                <ImageIcon className="w-20 h-20 text-muted-foreground/30" />
              </div>
            )}

            {/* Project Info */}
            <div className="flex-1 w-full">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h1
                    className="text-4xl font-bold mb-3 bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                    style={{
                      animation:
                        "fade-in-up 0.5s cubic-bezier(0.2, 0, 0, 1) forwards",
                    }}
                  >
                    {project.title}
                  </h1>
                  <p
                    className="text-muted-foreground text-lg"
                    style={{
                      animation:
                        "fade-in-up 0.5s cubic-bezier(0.2, 0, 0, 1) 0.1s forwards",
                      opacity: 0,
                    }}
                  >
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className="flex flex-wrap gap-3"
                style={{
                  animation:
                    "fade-in-up 0.5s cubic-bezier(0.2, 0, 0, 1) 0.2s forwards",
                  opacity: 0,
                }}
              >
                {(userRole === "OWNER" || userRole === "EDITOR") && (
                  <EditProjectForm project={project} userId={session.id} />
                )}
                {userRole === "OWNER" && (
                  <DeleteProject
                    projectId={project.id}
                    projectTitle={project.title}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 lg:p-8 space-y-6">
        {/* Stats Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{
            animation:
              "fade-in-up 0.5s cubic-bezier(0.2, 0, 0, 1) 0.3s forwards",
            opacity: 0,
          }}
        >
          <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 group">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Total Tasks
              </CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300">
                <FileBarChart2 className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-foreground">
                {totalTasks}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Active tasks in project
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border hover:border-secondary/50 transition-all duration-300 group">
            <div className="absolute inset-0 bg-linear-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Completed Tasks
              </CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-foreground">
                {completedTasks}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Successfully finished
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-300 group">
            <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Deadline
              </CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all duration-300">
                <Calendar className="h-4 w-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-foreground">
                {project.deadline.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {project.deadline.toLocaleDateString("en-US", {
                  year: "numeric",
                })}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card
          className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border"
          style={{
            animation:
              "fade-in-up 0.5s cubic-bezier(0.2, 0, 0, 1) 0.4s forwards",
            opacity: 0,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary to-transparent opacity-50" />
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-primary/20 to-secondary/20 border border-primary/30">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-foreground">
                  Project Progress
                </CardTitle>
                <CardDescription>
                  Overall completion status of your project
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {progress}% Complete
              </span>
              <Badge
                variant={progress >= 75 ? "default" : "secondary"}
                className={
                  progress >= 90
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : "bg-primary/20 text-primary border-primary/30"
                }
              >
                {progress >= 90 ? "Completed" : "In Progress"}
              </Badge>
            </div>
            <div className="relative">
              <Progress value={progress} className="h-3 bg-muted" />
              <div
                className="absolute top-0 left-0 h-3 bg-linear-to-r from-primary to-secondary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Navigation Section */}
        <Card
          className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border"
          style={{
            animation:
              "fade-in-up 0.5s cubic-bezier(0.2, 0, 0, 1) 0.5s forwards",
            opacity: 0,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary to-transparent opacity-50" />
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-secondary/20 to-accent/20 border border-secondary/30">
                <Layout className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <CardTitle className="text-foreground">Project Views</CardTitle>
                <CardDescription>
                  Choose how you want to view and manage your tasks
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href={`/project/${project.id}/kanban-board`}
                className="group"
              >
                <div className="relative overflow-hidden">
                  <div className="absolute -inset-1 bg-linear-to-r from-primary to-secondary rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
                  <Button
                    variant="outline"
                    className="relative w-full h-24 flex flex-col items-center justify-center gap-3 bg-muted/20 border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                      <Layout className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-center">
                      <span className="font-semibold text-foreground">
                        Kanban Board
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        Visual task management
                      </p>
                    </div>
                  </Button>
                </div>
              </Link>

              <Link href={`/project/${project.id}/list-view`} className="group">
                <div className="relative overflow-hidden">
                  <div className="absolute -inset-1 bg-linear-to-r from-secondary to-accent rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
                  <Button
                    variant="outline"
                    className="relative w-full h-24 flex flex-col items-center justify-center gap-3 bg-muted/20 border-border hover:border-secondary/50 hover:bg-secondary/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-linear-to-br from-secondary to-accent rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                      <List className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-center">
                      <span className="font-semibold text-foreground">
                        List View
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        Detailed task list
                      </p>
                    </div>
                  </Button>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Project Access Management */}
        <div
          style={{
            animation:
              "fade-in-up 0.5s cubic-bezier(0.2, 0, 0, 1) 0.6s forwards",
            opacity: 0,
          }}
        >
          <ProjectAccessManager
            projectId={project.id}
            currentUserId={session.id}
            currentUserRole={userRole}
            accessList={accessList}
            projectOwner={{
              id: project.user.id,
              name: project.user.name,
              email: project.user.email,
              image: project.user.image,
            }}
          />
        </div>

        {/* Project Details */}
        <Card
          className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border"
          style={{
            animation:
              "fade-in-up 0.5s cubic-bezier(0.2, 0, 0, 1) 0.7s forwards",
            opacity: 0,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-50" />
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-accent/20 to-primary/20 border border-accent/30">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <CardTitle className="text-foreground">Project Details</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/20 border border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <FileBarChart2 className="w-3.5 h-3.5" />
                  Title
                </h3>
                <p className="text-foreground font-medium">{project.title}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/20 border border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <FileBarChart2 className="w-3.5 h-3.5" />
                  Description
                </h3>
                <p className="text-foreground font-medium">
                  {project.description}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/20 border border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  Created
                </h3>
                <p className="text-foreground font-medium">
                  {project.createdAt.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/20 border border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  Last Updated
                </h3>
                <p className="text-foreground font-medium">
                  {project.updatedAt.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
