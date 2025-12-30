import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  FolderKanban,
  Plus,
  Flame,
  Timer,
  ClipboardList,
  Calendar as CalendarIcon,
} from "lucide-react";
import { TaskPriority } from "@/generated/prisma/enums";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  getDashboardStats,
  getProductivityData,
  getRecentActivity,
  getTasksForToday,
  getUpcomingDeadlines,
} from "@/app/actions/dashboard-actions";

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }
  if (!session.emailVerified) {
    redirect("/verify-email");
  }

  // Fetch all dashboard data
  const [stats, tasksToday, activities, productivity, deadlines] =
    await Promise.all([
      getDashboardStats(session.id),
      getTasksForToday(session.id),
      getRecentActivity(session.id),
      getProductivityData(session.id),
      getUpcomingDeadlines(session.id),
    ]);

  // Calculate progress percentages for stats
  const totalCount =
    stats.totalProjects > 0
      ? stats.totalProjects
      : stats.inProgressProjects +
          stats.completedProjects +
          stats.overdueProjects || 1;

  const statsCards = [
    {
      label: "Total Projects",
      value: stats.totalProjects,
      icon: FolderKanban,
      color: "text-primary",
      bgColor: "bg-primary/20",
      borderColor: "border-primary/30",
      progress: 100,
    },
    {
      label: "In Progress",
      value: stats.inProgressProjects,
      icon: Clock,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500/30",
      progress: Math.round((stats.inProgressProjects / totalCount) * 100),
    },
    {
      label: "Completed",
      value: stats.completedProjects,
      icon: CheckCircle2,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
      progress: Math.round((stats.completedProjects / totalCount) * 100),
    },
    {
      label: "Overdue",
      value: stats.overdueProjects,
      icon: AlertCircle,
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/30",
      progress: Math.round((stats.overdueProjects / totalCount) * 100),
    },
  ];

  const getPriorityBadge = (priority: TaskPriority) => {
    const colors = {
      HIGH: "bg-red-500/20 text-red-400 border-red-500/30",
      MEDIUM: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      LOW: "bg-green-500/20 text-green-400 border-green-500/30",
    };
    return (
      <Badge variant="outline" className={colors[priority]}>
        {priority}
      </Badge>
    );
  };

  // Calculate task distribution percentages
  const totalTasks = stats.totalTasks || 1;
  const taskDistribution = {
    inProgress: Math.round(
      ((stats.tasksByStatus.IN_PROGRESS + stats.tasksByStatus.REVIEW) /
        totalTasks) *
        100,
    ),
    completed: Math.round((stats.tasksByStatus.DONE / totalTasks) * 100),
    overdue: Math.round((stats.overdueProjects / totalTasks) * 100),
    todo: Math.round((stats.tasksByStatus.TODO / totalTasks) * 100),
  };

  return (
    <div className="min-h-screen p-6">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"
          style={{
            animation: "float-slow 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]"
          style={{
            animation: "float-slower 30s ease-in-out infinite",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto space-y-6 relative">
        {/* Header */}
        <header
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            animation: "fade-in-down 0.4s ease-out forwards",
          }}
        >
          <div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {session.name}! Here&apos;s an overview of your
              projects
            </p>
          </div>
          <Link href="/project">
            <Button className="button-animated bg-linear-to-r from-primary to-secondary hover:opacity-90 font-semibold">
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </Button>
          </Link>
        </header>

        {/* Stats Cards */}
        <section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          style={{
            animation: "fade-in-up 0.4s ease-out 0.1s forwards",
            opacity: 0,
          }}
        >
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className={`card-interactive bg-card/50 backdrop-blur-sm border ${stat.borderColor}`}
                style={{
                  animation: `fade-in-up 0.3s ease-out ${0.2 + index * 0.05}s forwards`,
                  opacity: 0,
                }}
              >
                <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <div
                    className={`${stat.bgColor} border ${stat.borderColor} p-2 rounded-lg transition-transform duration-200`}
                  >
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="relative mt-3">
                    <Progress value={stat.progress} className="h-2 bg-muted" />
                    <div
                      className="absolute top-0 left-0 h-2 bg-linear-to-r from-primary to-secondary rounded-full transition-all duration-500"
                      style={{ width: `${stat.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {stat.progress}% of total
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Today's Tasks */}
            <Card
              className="card-interactive bg-card/50 backdrop-blur-sm border-border"
              style={{
                animation: "fade-in-up 0.4s ease-out 0.2s forwards",
                opacity: 0,
              }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 border border-primary/30">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                  </div>
                  Due Today & Tomorrow
                </CardTitle>
                <CardDescription>
                  {tasksToday.length} task{tasksToday.length !== 1 ? "s" : ""}{" "}
                  upcoming
                </CardDescription>
              </CardHeader>
              <CardContent>
                {tasksToday.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No tasks due today</p>
                    <p className="text-sm">You&apos;re all caught up! 🎉</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tasksToday.map((task, i) => (
                      <Link
                        key={task.id}
                        href={`/project/${task.projectId}/kanban-board`}
                      >
                        <div
                          className="group p-3 rounded-lg border border-border bg-card/30 hover:bg-card/50 hover:border-primary/30 transition-all cursor-pointer"
                          style={{
                            animation: `fade-in-left 0.3s ease-out ${0.5 + i * 0.05}s forwards`,
                            opacity: 0,
                          }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                {task.description}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {task.projectTitle} • {task.userName}
                              </p>
                            </div>
                            {getPriorityBadge(task.priority)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card
              className="card-interactive bg-card/50 backdrop-blur-sm border-border"
              style={{
                animation: "fade-in-up 0.4s ease-out 0.45s forwards",
                opacity: 0,
              }}
            >
              <CardHeader>
                <CardTitle className="text-foreground">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-red-900/10 border border-red-500/20 rounded-lg">
                    <Flame className="w-5 h-5 text-red-400" />
                    <div className="flex-1">
                      <span className="font-medium text-sm text-foreground">
                        {stats.tasksByPriority.HIGH} high priority task
                        {stats.tasksByPriority.HIGH !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-900/10 border border-yellow-500/20 rounded-lg">
                    <Timer className="w-5 h-5 text-yellow-400" />
                    <div className="flex-1">
                      <span className="font-medium text-sm text-foreground">
                        {deadlines.within24h} deadline
                        {deadlines.within24h !== 1 ? "s" : ""} &lt; 24h
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-900/10 border border-primary/20 rounded-lg">
                    <ClipboardList className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <span className="font-medium text-sm text-foreground">
                        {stats.totalTasks} total task
                        {stats.totalTasks !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card
              className="card-interactive bg-card/50 backdrop-blur-sm border-border"
              style={{
                animation: "fade-in-up 0.4s ease-out 0.5s forwards",
                opacity: 0,
              }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/20 border border-secondary/30">
                    <TrendingUp className="h-4 w-4 text-secondary" />
                  </div>
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activities.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No recent activity</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activities.slice(0, 6).map((activity, i) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3"
                        style={{
                          animation: `fade-in-left 0.3s ease-out ${0.6 + i * 0.05}s forwards`,
                          opacity: 0,
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                          style={{
                            animation:
                              "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                          }}
                        />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm text-foreground line-clamp-2">
                            {activity.text}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.time} • {activity.user}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Productivity */}
            <Card
              className="card-interactive bg-card/50 backdrop-blur-sm border-border"
              style={{
                animation: "fade-in-up 0.4s ease-out 0.7s forwards",
                opacity: 0,
              }}
            >
              <CardHeader>
                <CardTitle className="text-foreground">Productivity</CardTitle>
                <CardDescription>Task completion - Last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productivity.map((day) => {
                    return (
                      <div key={day.day} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-foreground">
                            {day.day}
                          </span>
                          <span className="text-muted-foreground">
                            {day.completedTasks} task
                            {day.completedTasks !== 1 ? "s" : ""} ({day.value}%)
                          </span>
                        </div>
                        <div className="relative">
                          <Progress
                            value={day.value}
                            className="h-2 bg-muted"
                          />
                          <div
                            className="absolute top-0 left-0 h-2 bg-linear-to-r from-secondary to-primary rounded-full transition-all duration-500"
                            style={{ width: `${day.value}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Mini Calendar */}
            <Card
              className="card-interactive bg-card/50 backdrop-blur-sm border-border"
              style={{
                animation: "fade-in-up 0.4s ease-out 0.8s forwards",
                opacity: 0,
              }}
            >
              <CardHeader>
                <CardTitle className="text-foreground">Calendar</CardTitle>
                <CardDescription>December 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, index) => (
                    <div
                      key={index}
                      className="font-semibold text-muted-foreground pb-2"
                    >
                      {d}
                    </div>
                  ))}
                  {Array.from({ length: 35 }).map((_, i) => {
                    const today = new Date();
                    const isToday = i + 1 === today.getDate();
                    const hasEvent =
                      deadlines.within7days > 0 && i >= 14 && i <= 21;
                    return (
                      <div
                        key={i}
                        className={`p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer
                          ${isToday ? "bg-linear-to-br from-purple-700 to-cyan-700 text-white font-bold" : ""}
                          ${hasEvent && !isToday ? "bg-primary/20 border border-primary/30 font-medium" : ""}
                        `}
                      >
                        {i + 1}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Task Distribution */}
        <Card
          className="card-interactive bg-card/50 backdrop-blur-sm border-border"
          style={{
            animation: "fade-in-up 0.4s ease-out 0.6s forwards",
            opacity: 0,
          }}
        >
          <CardHeader>
            <CardTitle className="text-foreground">Task Distribution</CardTitle>
            <CardDescription>
              Overview by status • {stats.totalTasks} total tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center min-h-[250px]">
            {stats.totalTasks === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ClipboardList className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No tasks yet</p>
                <p className="text-sm mt-2">
                  Create your first project to get started
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6 w-full">
                <div className="text-center space-y-2 p-4 rounded-lg bg-primary/10 border border-primary/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all">
                  <div className="text-5xl font-bold text-primary">
                    {taskDistribution.inProgress || 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    In Progress
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stats.tasksByStatus.IN_PROGRESS +
                      stats.tasksByStatus.REVIEW}{" "}
                    tasks
                  </div>
                </div>
                <div className="text-center space-y-2 p-4 rounded-lg bg-green-500/10 border border-green-500/20 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all">
                  <div className="text-5xl font-bold text-green-400">
                    {taskDistribution.completed || 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                  <div className="text-xs text-muted-foreground">
                    {stats.tasksByStatus.DONE} tasks
                  </div>
                </div>
                <div className="text-center space-y-2 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 hover:shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-all">
                  <div className="text-5xl font-bold text-yellow-400">
                    {taskDistribution.overdue || 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">Overdue</div>
                  <div className="text-xs text-muted-foreground">
                    {stats.overdueProjects} projects
                  </div>
                </div>
                <div className="text-center space-y-2 p-4 rounded-lg bg-secondary/10 border border-secondary/20 hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all">
                  <div className="text-5xl font-bold text-secondary">
                    {taskDistribution.todo || 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">To Do</div>
                  <div className="text-xs text-muted-foreground">
                    {stats.tasksByStatus.TODO} tasks
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
