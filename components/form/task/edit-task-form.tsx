"use client";

import React, { useState } from "react";
import { updateTask } from "@/app/actions/task-actions";
import {
  BadgeHelpIcon,
  Edit3,
  FileText,
  Calendar,
  Tag,
  Shield,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Task, TaskPriority } from "@/generated/prisma/client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

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
    if (tagContent.trim().length > 0) {
      setTag([...tag, tagContent.trim()]);
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
      toast.success(`Task updated successfully`);
      setOpen(false);
    } catch {
      toast.error(`Failed to update task`);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-secondary hover:text-secondary/80 hover:bg-secondary/10 transition-all duration-300 dark"
          aria-label="Edit task"
        >
          <Edit3 className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl bg-card/95 backdrop-blur-xl border border-secondary/30 shadow-[0_0_50px_rgba(6,182,212,0.2)] dark">
        <div className="absolute inset-0 bg-linear-to-br from-secondary/5 via-transparent to-primary/5 pointer-events-none rounded-lg" />

        <DialogHeader className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-secondary to-primary border border-secondary/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Edit3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl bg-linear-to-r from-secondary to-primary bg-clip-text text-transparent">
                Edit Task
              </DialogTitle>
              <div className="h-px w-16 bg-linear-to-r from-secondary to-transparent mt-1" />
            </div>
          </div>
          <DialogDescription className="text-muted-foreground">
            Update details for this task
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={HandleEditTask} className="relative">
          <FieldSet>
            <FieldGroup className="space-y-5">
              <Field>
                <FieldLabel
                  htmlFor="description"
                  className="text-foreground flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-secondary" />
                  Description
                </FieldLabel>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-secondary to-primary rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="relative text-gray-300 max-h-28 h-full bg-muted/50 border-border focus:border-secondary/50 transition-all duration-300"
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="deadline"
                  className="text-foreground flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  Deadline
                </FieldLabel>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-accent to-primary rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
                  <Input
                    type="date"
                    id="deadline"
                    value={deadline}
                    required
                    onChange={(e) => setDeadline(e.target.value)}
                    className="relative text-gray-300 bg-muted/50 border-border focus:border-accent/50 transition-all duration-300"
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel className="text-foreground flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                  Priority
                </FieldLabel>
                <div className="relative group">
                  <Select
                    value={priority}
                    onValueChange={(v) => setPriority(v as TaskPriority)}
                  >
                    <SelectTrigger className="text-gray-300 relative bg-muted/50 border-border focus:border-primary/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black text-gray-300">
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="LOW">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Field>

              <Field>
                <FieldLabel className="text-foreground flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-secondary" />
                  Tags
                </FieldLabel>
                <div className="flex gap-3">
                  <Input
                    value={tagContent}
                    onChange={(e) => setTagContent(e.target.value)}
                    placeholder="Enter tag name..."
                    className="text-gray-300 bg-muted/50 border-border focus:border-secondary/50 transition-all duration-300"
                  />
                  <Button
                    onClick={AddTag}
                    type="button"
                    className="bg-secondary/20 border border-secondary/30 hover:bg-secondary/30 hover:border-secondary/50 text-secondary"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex gap-2 flex-wrap border border-border rounded-lg p-3 min-h-[80px] bg-muted/20">
                  {tag.length > 0 ? (
                    tag.map((e) => (
                      <Badge
                        key={e}
                        className="flex items-center gap-1.5 bg-secondary/20 text-secondary border-secondary/30"
                      >
                        <span>{e}</span>
                        <button
                          type="button"
                          onClick={() => RemoveTag(e)}
                          className="hover:text-secondary-foreground transition-colors"
                          aria-label="Remove tag"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))
                  ) : (
                    <div className="flex flex-col w-full justify-center items-center text-muted-foreground h-full gap-2">
                      <BadgeHelpIcon className="w-8 h-8 opacity-50" />
                      <span className="text-xs">No tags added yet</span>
                    </div>
                  )}
                </div>
              </Field>
            </FieldGroup>

            <FieldGroup className="mt-6">
              <DialogFooter className="gap-3">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    type="button"
                    className="text-gray-300 border-border hover:bg-muted hover:border-primary/30 transition-all duration-300"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-linear-to-r from-secondary to-primary rounded-lg opacity-0 group-hover:opacity-50 blur transition-all duration-300" />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="relative bg-linear-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 border border-secondary/50"
                  >
                    {loading ? <Spinner /> : "Update"}
                  </Button>
                </div>
              </DialogFooter>
            </FieldGroup>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
}
