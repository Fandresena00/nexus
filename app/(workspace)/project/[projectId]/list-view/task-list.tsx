import { Task } from "@/generated/prisma/client";
import RenderTask from "./render-task";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyTitle,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty";
import { FileBarChart2 } from "lucide-react";
import NewTaskForm from "@/components/form/new-task-form";

export default function TaskList({
  initialTasks = [],
  userId,
  projectId,
  userRole,
}: {
  initialTasks: Task[];
  userId: string;
  projectId: string;
  userRole: "OWNER" | "EDITOR" | "VIEWER" | null;
}) {
  const canEdit = userRole === "OWNER" || userRole === "EDITOR";

  return (
    <div className="bg-accent w-full my-2 min-h-[70vh]">
      <div className="grid grid-cols-2 bg-accent-foreground">
        <div className="flex items-center gap-2 py-2.5 px-8">
          <p className=" text-white">Description</p>
        </div>
        <div className="grid grid-cols-3">
          <h4 className="text-white  py-2.5 px-8">Badge</h4>
          <h4 className="text-white  py-2.5 px-8">Status</h4>
          <h4 className="text-white  py-2.5 px-8">Deadline</h4>
        </div>
      </div>

      {/** Task list */}
      {initialTasks.length > 0 ? (
        <div className="flex p-2.5 flex-col gap-3.5">
          {initialTasks.map((task) => (
            <RenderTask
              key={task.id}
              task={task}
              projectId={projectId}
              userId={userId}
              userRole={userRole}
            />
          ))}
        </div>
      ) : (
        <Empty className="border-4 border-dashed max-w-96 mx-auto my-8">
          <EmptyHeader>
            <EmptyMedia variant={"icon"}>
              <FileBarChart2 />
            </EmptyMedia>
            <EmptyTitle>Task Empty</EmptyTitle>
            <EmptyDescription>
              {canEdit
                ? "Create new task to better track your progress"
                : "No tasks available"}
            </EmptyDescription>
            {canEdit && (
              <EmptyContent>
                <NewTaskForm userId={userId} projectId={projectId} />
              </EmptyContent>
            )}
          </EmptyHeader>
        </Empty>
      )}
    </div>
  );
}
