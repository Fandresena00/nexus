import { getTasksByProject } from "@/app/actions/task-actions";
import { getSession } from "@/src/lib/auth-server";
import { redirect } from "next/navigation";
import KanbanBoard from "./kanban-board";

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
  const tasks = await getTasksByProject(projectId);

  return <KanbanBoard tasks={tasks} projectId={projectId} />;
}
