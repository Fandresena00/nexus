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
  Calendar,
  Clock,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Users,
  FolderKanban,
} from "lucide-react";
import { TaskPriority } from "@/generated/prisma/enums";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  const stats = [
    {
      label: "Projets totaux",
      value: 12,
      icon: FolderKanban,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "En cours",
      value: 6,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      label: "Terminés",
      value: 3,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "En retard",
      value: 2,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  const tasksToday = [
    {
      id: 1,
      title: "Créer la page login",
      owner: "Toi",
      due: "Aujourd'hui",
      priority: TaskPriority.HIGH,
    },
    {
      id: 2,
      title: "Corriger le header",
      owner: "Sarah",
      due: "Aujourd'hui",
      priority: TaskPriority.MEDIUM,
    },
    {
      id: 3,
      title: "Relire le README",
      owner: "Alex",
      due: "Aujourd'hui",
      priority: TaskPriority.LOW,
    },
  ];

  const activities = [
    { text: 'Fandresena a ajouté "Créer la page login"', time: "Il y a 5 min" },
    { text: 'Projet "Portfolio" → En cours', time: "Il y a 1h" },
    { text: 'Tâche "Intégrer API" terminée', time: "Il y a 2h" },
    { text: "Nouveau membre ajouté : Sarah", time: "Il y a 3h" },
  ];

  const getPriorityBadge = (priority: TaskPriority) => {
    return <Badge variant={"secondary"}>{priority}</Badge>;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Bienvenue ! Voici un aperçu de vos projets
            </p>
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Nouveau projet
          </Button>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </CardTitle>
                  <div className={`${stat.bgColor} p-2 rounded-lg`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <Progress value={stat.value * 8} className="mt-3 h-1" />
                </CardContent>
              </Card>
            );
          })}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Tasks & Activity */}
          <div className="space-y-6">
            {/* Today's Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Tâches du jour
                </CardTitle>
                <CardDescription>
                  3 tâches à accomplir aujourd&apos;hui
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasksToday.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="font-medium text-sm">{task.title}</div>
                        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <Users className="h-3 w-3" />
                          {task.owner}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {getPriorityBadge(task.priority)}
                        <Button size="sm" variant="ghost">
                          Voir
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Urgent Tasks */}
            <Card className="border-red-200 dark:border-red-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  Tâches urgentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-950 rounded">
                    <span className="text-xl">🔥</span>
                    <span className="font-medium">2 en retard</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-amber-50 dark:bg-amber-950 rounded">
                    <span className="text-xl">⏳</span>
                    <span className="font-medium">1 deadline &lt; 24h</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-950 rounded">
                    <span className="text-xl">📋</span>
                    <span className="font-medium">Assignées à moi</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Activité récente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">{activity.text}</p>
                        <p className="text-xs text-slate-500">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Charts & Calendar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Distribution Chart */}
            <Card className="h-80">
              <CardHeader>
                <CardTitle>Répartition des tâches</CardTitle>
                <CardDescription>
                  Vue d&apos;ensemble par statut
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-4xl font-bold text-blue-600">
                        50%
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        En cours
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-4xl font-bold text-green-600">
                        25%
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Terminé
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-4xl font-bold text-amber-600">
                        17%
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        En retard
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-4xl font-bold text-slate-600">
                        8%
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        À faire
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Productivity Chart */}
            <Card className="h-80">
              <CardHeader>
                <CardTitle>Productivité</CardTitle>
                <CardDescription>7 derniers jours</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-3">
                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(
                    (day) => (
                      <div key={day} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{day}</span>
                          <span className="text-slate-600">55</span>
                        </div>
                        <Progress value={10} />
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Mini Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Calendrier</CardTitle>
                <CardDescription>Décembre 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                  {["L", "M", "M", "J", "V", "S", "D"].map((d, index) => (
                    <div
                      key={index}
                      className="font-semibold text-slate-600 dark:text-slate-400 pb-2"
                    >
                      {d}
                    </div>
                  ))}
                  {Array.from({ length: 35 }).map((_, i) => {
                    const isToday = i === 11;
                    const hasEvent = [3, 8, 15, 22].includes(i);
                    return (
                      <div
                        key={i}
                        className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors
                          ${isToday ? "bg-blue-600 text-white font-bold" : ""}
                          ${hasEvent && !isToday ? "bg-blue-100 dark:bg-blue-950 font-medium" : ""}
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
      </div>
    </div>
  );
}
