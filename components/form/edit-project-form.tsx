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
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Edit3,
  FileText,
  Calendar,
  Image as ImageIcon,
  Save,
} from "lucide-react";
import { Project } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";

export default function EditProjectForm({
  project,
  userId,
}: {
  project: Project;
  userId: string;
}) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [deadline, setDeadline] = useState(
    project.deadline.toISOString().split("T")[0],
  );
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl: string | undefined;

      if (image) {
        imageUrl = await uploadImage(image);
      }

      await updateProject(project.id, userId, {
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

  if (!mounted) {
    return (
      <Button variant="outline" disabled className="dark">
        <Edit3 className="w-4 h-4 mr-2" />
        Edit Project
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-border text-gray-300 hover:bg-secondary/10 hover:border-secondary/50 hover:text-secondary transition-all duration-300 dark"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl bg-card/95 backdrop-blur-xl border border-secondary/30 shadow-[0_0_50px_rgba(6,182,212,0.2)] dark">
        {/* Neon glow overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-secondary/5 via-transparent to-primary/5 pointer-events-none rounded-lg" />

        <DialogHeader className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-secondary to-primary border border-secondary/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Edit3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl bg-linear-to-r from-secondary to-primary bg-clip-text text-transparent">
                Edit Project
              </DialogTitle>
              <div className="h-px w-20 bg-linear-to-r from-secondary to-transparent mt-1" />
            </div>
          </div>
          <DialogDescription className="text-muted-foreground">
            Update your project information and settings
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdateProject} className="relative">
          <div className="w-full max-w-xl mx-auto">
            <FieldSet>
              <FieldGroup className="space-y-5">
                {/* Title Field */}
                <Field
                  style={{
                    animation:
                      "fade-in-up 0.4s cubic-bezier(0.2, 0, 0, 1) 0.1s forwards",
                    opacity: 0,
                  }}
                >
                  <FieldLabel
                    htmlFor="title"
                    className="text-foreground flex items-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-secondary" />
                    Project Title
                  </FieldLabel>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-secondary to-primary rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
                    <Input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      autoFocus
                      className="relative text-gray-300 bg-muted/50 border-border focus:border-secondary/50 transition-all duration-300"
                    />
                  </div>
                </Field>

                {/* Description Field */}
                <Field
                  style={{
                    animation:
                      "fade-in-up 0.4s cubic-bezier(0.2, 0, 0, 1) 0.2s forwards",
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
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      className="relative text-gray-300 max-h-28 h-full bg-muted/50 border-border focus:border-primary/50 transition-all duration-300"
                    />
                  </div>
                </Field>

                {/* Deadline Field */}
                <Field
                  style={{
                    animation:
                      "fade-in-up 0.4s cubic-bezier(0.2, 0, 0, 1) 0.3s forwards",
                    opacity: 0,
                  }}
                >
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

                {/* Image Field */}
                <Field
                  style={{
                    animation:
                      "fade-in-up 0.4s cubic-bezier(0.2, 0, 0, 1) 0.4s forwards",
                    opacity: 0,
                  }}
                >
                  <FieldLabel
                    htmlFor="image"
                    className="text-foreground flex items-center gap-2"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-secondary" />
                    Project Cover
                  </FieldLabel>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-secondary to-accent rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
                    <Input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="relative text-gray-300 cursor-pointer bg-muted/50 border-border hover:border-secondary/50 transition-all duration-300"
                    />
                  </div>
                  {image && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground bg-secondary/10 border border-secondary/20 rounded-lg px-3 py-2">
                      <ImageIcon className="w-4 h-4 text-secondary" />
                      <span>{image.name}</span>
                    </div>
                  )}
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
                      className="absolute -inset-1 bg-linear-to-r from-secondary via-primary to-accent rounded-lg opacity-70 group-hover:opacity-100 blur transition-all duration-300"
                      style={{
                        animation: loading
                          ? "none"
                          : "tilt 3s ease-in-out infinite",
                      }}
                    />
                    <Button
                      type="submit"
                      disabled={loading}
                      className="relative bg-linear-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 border border-secondary/50 shadow-lg transition-all duration-300"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <Spinner />
                          <span>Updating...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Save className="w-4 h-4" />
                          <span>Update Project</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </DialogFooter>
              </FieldGroup>
            </FieldSet>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
