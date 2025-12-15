import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import {
  Pencil,
  Mail,
  Calendar,
  FolderKanban,
  CheckSquare,
  User,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function page() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  // Get user statistics
  const [projectCount, taskCount, completedTaskCount] = await Promise.all([
    prisma.project.count({
      where: { userId: session.id },
    }),
    prisma.task.count({
      where: { userId: session.id },
    }),
    prisma.task.count({
      where: {
        userId: session.id,
        taskStatus: "DONE",
      },
    }),
  ]);

  const initials = `${session.name[0]}${
    session.name[session.name.length - 1]
  }`.toUpperCase();

  const completionRate =
    taskCount > 0 ? Math.round((completedTaskCount / taskCount) * 100) : 0;

  return (
    <div className="min-h-screen p-6 lg:p-8 dark">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Card */}
        <Card
          className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-primary/30 shadow-[0_0_30px_rgba(139,92,246,0.2)]"
          style={{
            animation: "fade-in-up 0.5s cubic-bezier(0.2, 0, 0, 1) forwards",
          }}
        >
          {/* Neon top border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />

          {/* Animated background */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

          <CardContent className="relative p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                {/* Avatar with glow */}
                <div className="relative">
                  <div
                    className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"
                    style={{
                      animation: "pulse-glow 3s ease-in-out infinite",
                    }}
                  />
                  {session.image ? (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary/50 shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                      <Image
                        src={session.image}
                        alt={session.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative w-24 h-24 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold border-4 border-primary/50 shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                      {initials}
                    </div>
                  )}
                  {/* Online indicator */}
                  <div
                    className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 rounded-full border-4 border-card shadow-[0_0_15px_rgba(74,222,128,0.8)]"
                    style={{
                      animation:
                        "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  />
                </div>

                {/* User info */}
                <div>
                  <h1 className="text-3xl font-bold mb-2 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {session.name}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4 text-secondary" />
                    <span>{session.email}</span>
                  </div>
                </div>
              </div>

              {/* Edit button */}
              <Link href="/profil/edit">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-linear-to-r from-secondary to-primary rounded-lg opacity-70 group-hover:opacity-100 blur transition-all duration-300" />
                  <Button className="relative bg-linear-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 border border-secondary/50">
                    <Pencil className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </Button>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{
            animation:
              "fade-in-up 0.5s cubic-bezier(0.2, 0, 0, 1) 0.1s forwards",
            opacity: 0,
          }}
        >
          {/* Projects Card */}
          <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300">
                  <FolderKanban className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Projects</p>
                  <p className="text-3xl font-bold text-foreground">
                    {projectCount}
                  </p>
                </div>
              </div>
              <Link
                href="/project"
                className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 group/link transition-colors duration-300"
              >
                <span>View all projects</span>
                <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </CardContent>
          </Card>

          {/* Total Tasks Card */}
          <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]">
            <div className="absolute inset-0 bg-linear-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/20 border border-secondary/30 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300">
                  <CheckSquare className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Tasks</p>
                  <p className="text-3xl font-bold text-foreground">
                    {taskCount}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Completed Tasks Card */}
          <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(236,72,153,0.2)]">
            <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300">
                  <CheckSquare className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold text-foreground">
                    {completedTaskCount}
                  </p>
                </div>
              </div>
              {taskCount > 0 && (
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-green-400">
                      {completionRate}%
                    </span>{" "}
                    completion rate
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Account Information */}
        <Card
          className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border"
          style={{
            animation:
              "fade-in-up 0.5s cubic-bezier(0.2, 0, 0, 1) 0.2s forwards",
            opacity: 0,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary to-transparent" />

          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-secondary/20 to-accent/20 border border-secondary/30">
                <User className="w-5 h-5 text-secondary" />
              </div>
              <CardTitle className="text-foreground">
                Account Information
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border hover:border-secondary/30 transition-colors duration-300">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary" />
                <span className="text-sm font-semibold text-foreground">
                  Email
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {session.email}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border hover:border-accent/30 transition-colors duration-300">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-accent" />
                <span className="text-sm font-semibold text-foreground">
                  Member Since
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(session.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
