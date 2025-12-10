import { Task } from "@/generated/prisma/client";
import RenderTask from "./render-task";

export default function TaskList({
  initialTasks = [],
  userId,
  projectId,
}: {
  initialTasks: Task[];
  userId: string;
  projectId: string;
}) {
  return (
    <div className="bg-accent w-full my-2 min-h-[70vh]">
      <div className="grid grid-cols-2 bg-accent-foreground">
        <div className="flex items-center gap-2 py-2.5 px-8">
          <h3 className="text-white font-bold text-sm tracking-wide">TITLE</h3>
          <p className="text-white">( description )</p>
        </div>
        <div className="grid grid-cols-3">
          <h4 className="text-white  py-2.5 px-8">Badge</h4>
          <h4 className="text-white  py-2.5 px-8">Status</h4>
          <h4 className="text-white  py-2.5 px-8">Deadline</h4>
        </div>
      </div>

      {/** Task list */}
      <div className="flex p-2.5 flex-col gap-3.5">
        {initialTasks.map((task) => (
          <RenderTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
