"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Spinner } from "../ui/spinner";
import React, { useState } from "react";
import { updateTask } from "@/app/actions/task-actions";
import { BadgeHelpIcon, Edit3 } from "lucide-react";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Task, TaskPriority } from "@/generated/prisma/client";

export default function EditTaskForm({
  task,
  userId,
}: {
  task: Task;
  userId: string;
}) {
  const [description, setDescription] = useState(task.description || "");
  const [deadline, setDeadline] = useState(
    new Date(task.deadline).toISOString().slice(0, 10),
  );
  const [tag, setTag] = useState<string[]>(task.tag || []);
  const [tagContent, setTagContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [priority, setPriority] = useState<TaskPriority>(
    task.priority || "MEDIUM",
  );
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const AddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagContent.length > 0) {
      setTag([...tag, tagContent]);
      setTagContent("");
    }
  };

  const RemoveTag = (tagToRemove: string) => {
    setTag(tag.filter((t) => t !== tagToRemove));
  };

  const HandleEditTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateTask(task.id, userId, {
        description,
        deadline: new Date(deadline),
        tag,
        priority,
      });
      toast.success(`Task updated`);
      setOpen(false);
      router.refresh();
    } catch {
      toast.error(`Failed to update task`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="p-1"
          aria-label="Edit task"
        >
          <Edit3 className="w-4 h-4 text-sky-700" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Update details for this task</DialogDescription>
        </DialogHeader>
        <form onSubmit={HandleEditTask}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="max-h-28 h-full"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="deadline">Deadline</FieldLabel>
                <Input
                  type="date"
                  id="deadline"
                  value={deadline}
                  required
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel>Priority</FieldLabel>
                <Select
                  value={priority}
                  onValueChange={(v) => setPriority(v as TaskPriority)}
                >
                  <SelectTrigger>{priority}</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HIGH">high</SelectItem>
                    <SelectItem value="MEDIUM">medium</SelectItem>
                    <SelectItem value="LOW">low</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Tag</FieldLabel>
                <div className="flex gap-3">
                  <Input
                    value={tagContent}
                    onChange={(e) => setTagContent(e.target.value)}
                  />
                  <Button onClick={AddTag} type="button">
                    Add
                  </Button>
                </div>
                <div className="flex gap-2.5 border-2 p-2 h-16 flex-wrap">
                  {tag.length > 0 ? (
                    tag.map((e) => (
                      <div key={e} className="flex items-center gap-1">
                        <Badge>{e}</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => RemoveTag(e)}
                          aria-label="Remove tag"
                        >
                          ×
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col w-full justify-center text-xs font-bold h-full items-center">
                      <BadgeHelpIcon />
                      <span>Empty badge</span>
                    </div>
                  )}
                </div>
              </Field>
            </FieldGroup>
            <FieldGroup>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={loading}>
                  {loading ? <Spinner /> : "Update"}
                </Button>
              </DialogFooter>
            </FieldGroup>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
}
