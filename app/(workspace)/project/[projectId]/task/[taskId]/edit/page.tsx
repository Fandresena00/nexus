import { getTaskById } from "@/app/actions/task-actions";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import EditTaskForm from "./edit-task-form";

export default async function page({
  params,
}: {
  params: Promise<{ projectId: string; taskId: string }>;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  const { projectId, taskId } = await params;
  const task = await getTaskById(taskId);

  if (!task) {
    redirect(`/project/${projectId}/kanban`);
  }

  return (
    <div className="flex items-center justify-center p-8 min-h-screen">
      <EditTaskForm task={task} projectId={projectId} />
    </div>
  );
}
