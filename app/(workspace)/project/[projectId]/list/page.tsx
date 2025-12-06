import { getTasksByProject } from "@/app/actions/task-actions";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import TaskList from "./task-list";

export default async function page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  const { projectId } = await params;
  const tasks = await getTasksByProject(projectId);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Liste des tâches</h2>
      <ul className="space-y-4">
        <TaskList tasks={tasks} projectId={projectId} />
      </ul>
    </div>
  );
}
