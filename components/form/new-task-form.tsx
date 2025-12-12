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
import { createTask } from "@/app/actions/task-actions";
import { PlusCircle, BadgeHelpIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TaskPriority } from "@/generated/prisma/enums";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";

export default function NewTaskForm({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}) {
  const [description, SetDescription] = useState("");
  const [deadline, SetDeadline] = useState("");
  const [tag, SetTag] = useState<string[]>([]);
  const [tagContent, SetTagContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);

  const router = useRouter();

  const AddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagContent.length > 0) {
      SetTag([...tag, tagContent]);
      SetTagContent("");
    }
  };

  const HandleCreateTaskCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (description.length > 0 && deadline.length > 0 && tag.length > 0) {
        await createTask({
          projectId: projectId,
          userId: userId,
          description: description,
          deadline: new Date(deadline),
          tag: tag,
          priority: priority,
        });
        toast.success(`task ${description} has been created`);
        SetDescription("");
        SetDeadline("");
        SetTag([]);
      } else {
        toast.error(`Invalid task information`);
      }
    } catch (err) {
      console.error("Error creating project:", err);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle />
          <span>create task</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create new task</DialogTitle>
          <DialogDescription>task card</DialogDescription>
        </DialogHeader>

        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="description">Descrition</FieldLabel>
              <Textarea
                value={description}
                onChange={(e) => SetDescription(e.target.value)}
                required
                className="max-h-28 h-full"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="daedline">Deadline</FieldLabel>
              <Input
                type="date"
                value={deadline}
                required
                onChange={(e) => SetDeadline(e.target.value)}
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
                  <SelectItem value={TaskPriority.HIGH}>high</SelectItem>
                  <SelectItem value={TaskPriority.MEDIUM}>medium</SelectItem>
                  <SelectItem value={TaskPriority.LOW}>low</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Tag</FieldLabel>
              <div className="flex gap-3">
                <Input
                  value={tagContent}
                  onChange={(e) => SetTagContent(e.target.value)}
                />
                <Button onClick={AddTag}>Add</Button>
              </div>
              <div className="flex gap-2.5 border-2 p-2 h-16">
                {tag.length > 0 ? (
                  tag.map((e) => (
                    <div key={e}>
                      <Badge>{e}</Badge>
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
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={HandleCreateTaskCard} disabled={loading}>
                  {loading ? <Spinner /> : "Confirm"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </FieldGroup>
        </FieldSet>
      </DialogContent>
      {/** Submit Button */}
    </Dialog>
  );
}
