"use client";

import { updateProject } from "@/app/actions/project-action";
import { uploadImage } from "@/app/actions/project-action";
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
import { useState } from "react";
import { toast } from "sonner";
import { Edit3 } from "lucide-react";
import { Project } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";

export default function EditProjectForm({ project }: { project: Project }) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [deadline, setDeadline] = useState(
    project.deadline.toISOString().split("T")[0],
  );
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl: string | undefined;

      // Handle image upload if a new image was selected
      if (image) {
        imageUrl = await uploadImage(image);
      }

      await updateProject(project.id, {
        title,
        description,
        deadline,
        image: imageUrl,
      });

      toast.success(`Project ${title} has been updated`);
      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>Update your project information</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdateProject}>
          <div className="w-full max-w-md mx-auto">
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    autoFocus
                  />
                </Field>

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
                  <FieldLabel htmlFor="image">Project Image</FieldLabel>
                  <Input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                  {image && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Selected: {image.name}
                    </p>
                  )}
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
                    {loading ? <Spinner /> : "Update Project"}
                  </Button>
                </DialogFooter>
              </FieldGroup>
            </FieldSet>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
