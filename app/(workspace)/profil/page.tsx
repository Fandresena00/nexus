import { getSession } from "@/src/lib/auth-server";
import { redirect } from "next/navigation";
import NavButton from "@/src/components/personnal/nav-button";
import {
  Pencil,
  Mail,
  Calendar,
  FolderKanban,
  CheckSquare,
} from "lucide-react";
import Link from "next/link";
import prisma from "@/src/lib/prisma";
import Image from "next/image";

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

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/** Header */}
      <div className="bg-white rounded-xl shadow-lg shadow-gray-600/50 p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            {session.image ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-600">
                <Image
                  src={session.image}
                  alt={session.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                {initials}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-blue-950 mb-2">
                {session.name}
              </h1>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                <span>{session.email}</span>
              </div>
            </div>
          </div>
          <Link href="/profil/edit">
            <NavButton
              text="Modifier le profil"
              icon={<Pencil size={18} />}
              principal
            />
          </Link>
        </div>
      </div>

      {/** Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/** Projects Card */}
        <div className="bg-white rounded-xl shadow-lg shadow-gray-600/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FolderKanban className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Projets</p>
              <p className="text-2xl font-bold text-blue-950">{projectCount}</p>
            </div>
          </div>
          <Link
            href="/project"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Voir tous les projets →
          </Link>
        </div>

        {/** Tasks Card */}
        <div className="bg-white rounded-xl shadow-lg shadow-gray-600/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckSquare className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tâches totales</p>
              <p className="text-2xl font-bold text-blue-950">{taskCount}</p>
            </div>
          </div>
        </div>

        {/** Completed Tasks Card */}
        <div className="bg-white rounded-xl shadow-lg shadow-gray-600/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <CheckSquare className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tâches terminées</p>
              <p className="text-2xl font-bold text-blue-950">
                {completedTaskCount}
              </p>
            </div>
          </div>
          {taskCount > 0 && (
            <p className="text-sm text-gray-500">
              {Math.round((completedTaskCount / taskCount) * 100)}% complété
            </p>
          )}
        </div>
      </div>

      {/** Account Information */}
      <div className="bg-white rounded-xl shadow-lg shadow-gray-600/50 p-8">
        <h2 className="text-xl font-bold text-blue-950 mb-6">
          Informations du compte
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-gray-400" />
              <span className="text-sm font-semibold text-gray-700">Email</span>
            </div>
            <span className="text-sm text-gray-600">{session.email}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-400" />
              <span className="text-sm font-semibold text-gray-700">
                Membre depuis
              </span>
            </div>
            <span className="text-sm text-gray-600">
              {new Date().toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
