import TaskOption from "@/components/ui/actions/task-option";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Task } from "@/generated/prisma/client";

export default function RenderTasks({
  task,
  onDragStart,
  onDragEnd,
}: {
  task: Task;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDragEnd: (e: React.DragEvent) => void;
}) {
  return (
    <div
      draggable // Rend la carte draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      className="cursor-grab"
    >
      <Card className="rounded-none hover:shadow-xl transition-all">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{task.title}</span>
            <TaskOption taskId={task.id} taskTitle={task.title} />
          </CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {task.tag.map((e) => (
              <Badge key={e}>{e}</Badge>
            ))}
          </div>
          <h4 className="flex text-xs tracking-wide gap-1.5">
            <span>{task.deadline.toDateString()}</span>
          </h4>
        </CardContent>
      </Card>
    </div>
  );
}
