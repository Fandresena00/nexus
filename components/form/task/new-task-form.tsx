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
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../ui/field";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Spinner } from "../../ui/spinner";
import React, { useState } from "react";
import { createTask } from "@/app/actions/task-actions";
import {
  PlusCircle,
  BadgeHelpIcon,
  FileText,
  Calendar,
  Tag,
  Zap,
  Shield,
  X,
} from "lucide-react";
import { Badge } from "../../ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TaskPriority } from "@/generated/prisma/enums";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

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
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const AddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagContent.trim().length > 0) {
      SetTag([...tag, tagContent.trim()]);
      SetTagContent("");
    }
  };

  const RemoveTag = (tagToRemove: string) => {
    SetTag(tag.filter((t) => t !== tagToRemove));
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
        toast.success(`Task created successfully`);
        SetDescription("");
        SetDeadline("");
        SetTag([]);
        setPriority(TaskPriority.MEDIUM);
        setOpen(false);
      } else {
        toast.error(`Please fill all required fields and add at least one tag`);
      }
    } catch (err) {
      console.error("Error creating task:", err);
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger asChild>
        <Button className="relative group overflow-hidden bg-linear-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 border border-primary/50 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 dark">
          <div
            className="absolute inset-0 bg-linear-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              animation: "shimmer 2s linear infinite",
              backgroundSize: "200% 100%",
            }}
          />
          <div className="relative flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            <span>Create Task</span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl bg-card/95 backdrop-blur-xl border border-primary/30 shadow-[0_0_50px_rgba(139,92,246,0.2)] dark">
        {/* Neon glow overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none rounded-lg" />

        <DialogHeader className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-primary to-secondary border border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Create New Task
              </DialogTitle>
              <div className="h-px w-20 bg-linear-to-r from-primary to-transparent mt-1" />
            </div>
          </div>
          <DialogDescription className="text-muted-foreground">
            Add a new task to track your project progress
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={HandleCreateTaskCard} className="relative">
          <FieldSet>
            <FieldGroup className="space-y-5">
              {/* Description Field */}
              <Field
                style={{
                  animation:
                    "fade-in-up 0.4s cubic-bezier(0.2, 0, 0, 1) 0.1s forwards",
                  opacity: 0,
                }}
              >
                <FieldLabel
                  htmlFor="description"
                  className="text-foreground flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  Description
                </FieldLabel>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-secondary rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
                  <Textarea
                    value={description}
                    onChange={(e) => SetDescription(e.target.value)}
                    required
                    placeholder="Describe the task..."
                    className="relative text-gray-300 max-h-28 h-full bg-muted/50 border-border focus:border-primary/50 transition-all duration-300"
                  />
                </div>
              </Field>

              {/* Deadline Field */}
              <Field
                style={{
                  animation:
                    "fade-in-up 0.4s cubic-bezier(0.2, 0, 0, 1) 0.2s forwards",
                  opacity: 0,
                }}
              >
                <FieldLabel
                  htmlFor="deadline"
                  className="text-foreground flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-secondary" />
                  Deadline
                </FieldLabel>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-secondary to-accent rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
                  <Input
                    type="date"
                    value={deadline}
                    required
                    onChange={(e) => SetDeadline(e.target.value)}
                    className="relative text-gray-300 bg-muted/50 border-border focus:border-secondary/50 transition-all duration-300"
                  />
                </div>
              </Field>

              {/* Priority Field */}
              <Field
                style={{
                  animation:
                    "fade-in-up 0.4s cubic-bezier(0.2, 0, 0, 1) 0.3s forwards",
                  opacity: 0,
                }}
              >
                <FieldLabel className="text-foreground flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-accent" />
                  Priority
                </FieldLabel>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-accent to-primary rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
                  <Select
                    value={priority}
                    onValueChange={(v) => setPriority(v as TaskPriority)}
                  >
                    <SelectTrigger className="text-gray-300 relative bg-muted/50 border-border focus:border-accent/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={TaskPriority.HIGH}>High</SelectItem>
                      <SelectItem value={TaskPriority.MEDIUM}>
                        Medium
                      </SelectItem>
                      <SelectItem value={TaskPriority.LOW}>Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Field>

              {/* Tag Field */}
              <Field
                style={{
                  animation:
                    "fade-in-up 0.4s cubic-bezier(0.2, 0, 0, 1) 0.4s forwards",
                  opacity: 0,
                }}
              >
                <FieldLabel className="text-foreground flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-secondary" />
                  Tags
                </FieldLabel>
                <div className="flex gap-3">
                  <Input
                    value={tagContent}
                    onChange={(e) => SetTagContent(e.target.value)}
                    placeholder="Enter tag name..."
                    className="text-gray-300 bg-muted/50 border-border focus:border-secondary/50 transition-all duration-300"
                  />
                  <Button
                    onClick={AddTag}
                    type="button"
                    className="bg-secondary/20 border border-secondary/30 hover:bg-secondary/30 hover:border-secondary/50 text-secondary transition-all duration-300"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex gap-2 flex-wrap border border-border rounded-lg p-3 min-h-[80px] bg-muted/20">
                  {tag.length > 0 ? (
                    tag.map((e) => (
                      <Badge
                        key={e}
                        className="flex items-center gap-1.5 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 transition-colors duration-300"
                      >
                        <span>{e}</span>
                        <button
                          type="button"
                          onClick={() => RemoveTag(e)}
                          className="hover:text-primary-foreground transition-colors"
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

            {/* Footer Buttons */}
            <FieldGroup
              className="mt-6"
              style={{
                animation:
                  "fade-in-up 0.4s cubic-bezier(0.2, 0, 0, 1) 0.5s forwards",
                opacity: 0,
              }}
            >
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
                  <div
                    className="absolute -inset-1 bg-linear-to-r from-primary via-secondary to-accent rounded-lg opacity-70 group-hover:opacity-100 blur transition-all duration-300"
                    style={{
                      animation: loading
                        ? "none"
                        : "tilt 3s ease-in-out infinite",
                    }}
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="relative bg-linear-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 border border-primary/50 shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Spinner />
                        <span>Creating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        <span>Create Task</span>
                      </div>
                    )}
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
