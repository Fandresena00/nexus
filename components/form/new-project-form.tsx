"use client";

import { createProject } from "@/app/actions/project-action";
import { Button } from "@/components/ui/button";
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
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function NewProjectForm({ userId }: { userId: string }) {
  const [title, SetTitle] = useState("");
  const [description, SetDescription] = useState("");
  const [deadline, SetDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const HandleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (title.length > 0 && description.length > 0 && deadline.length > 0) {
      try {
        await createProject(title, description, deadline, userId);
        toast.success(`Project ${title} has been created`, {
          description: description,
        });
        router.refresh();
      } catch (error) {
        console.error("Error creating project:", error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("invalid project");
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>create project</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create a project</DialogTitle>
            <DialogDescription>
              Give the explicit information of the project for better track
              progression
            </DialogDescription>
          </DialogHeader>

          <div className="w-full max-w-md mx-auto">
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => SetTitle(e.target.value)}
                    required
                    autoFocus
                  />
                </Field>
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
              </FieldGroup>

              <FieldGroup>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant={"outline"}>Cancel</Button>
                  </DialogClose>
                  <Button onClick={HandleCreateProject} disabled={loading}>
                    {loading ? <Spinner /> : "Confirm"}
                  </Button>
                </DialogFooter>
              </FieldGroup>
            </FieldSet>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
