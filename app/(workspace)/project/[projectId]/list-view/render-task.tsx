import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Task } from "@/generated/prisma/client";

export default function RenderTask({ task }: { task: Task }) {
  return (
    <Card className="grid grid-cols-2 rounded-none hover:shadow-xl transition-all">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-3">
        <div className="flex gap-2 items-center">
          {task.tag.map((e) => (
            <Badge key={e}>{e}</Badge>
          ))}
        </div>
        <Select>
          <SelectTrigger>{task.taskStatus}</SelectTrigger>
          <SelectContent>
            <SelectItem value="TO DO">To Do</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="REVIEW">In Review</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>
        <h3 className="flex text-sm items-center justify-center">
          {task.deadline.toDateString()}
        </h3>
      </CardContent>
    </Card>
  );
}
