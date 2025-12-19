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
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Plus,
  FileText,
  Calendar,
  Image as ImageIcon,
  Zap,
} from "lucide-react";

export default function NewProjectForm({ userId }: { userId: string }) {
  const [title, SetTitle] = useState("");
  const [description, SetDescription] = useState("");
  const [deadline, SetDeadline] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const HandleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (title.length > 0 && description.length > 0 && deadline.length > 0) {
      try {
        await createProject(
          title,
          description,
          deadline,
          userId,
          image || undefined,
        );
        toast.success(`Project ${title} has been created`, {
          description: description,
        });
        setIsOpen(false);
        SetTitle("");
        SetDescription("");
        SetDeadline("");
        setImage(null);
        router.refresh();
      } catch (error) {
        console.error("Error creating project:", error);
        toast.error("Failed to create project");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please fill in all required fields");
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
      <Button
        disabled
        className="relative group overflow-hidden bg-primary/10 border-primary/20 dark"
      >
        <Plus className="w-4 h-4 mr-2" />
        Create Project
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="relative group overflow-hidden bg-linear-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 border border-primary/50 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 dark">
          {/* Animated background */}
          <div
            className="absolute inset-0 bg-linear-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              animation: "shimmer 2s linear infinite",
              backgroundSize: "200% 100%",
            }}
          />

          <div className=" relative flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Create Project</span>
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
                Create New Project
              </DialogTitle>
              <div className="h-px w-20 bg-linear-to-r from-primary to-transparent mt-1" />
            </div>
          </div>
          <DialogDescription className="text-muted-foreground">
            Define your project with clear objectives and milestones for optimal
            tracking
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={HandleCreateProject} className="relative">
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
                    <FileText className="w-3.5 h-3.5 text-primary" />
                    Project Title
                  </FieldLabel>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-secondary rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
                    <Input
                      type="text"
                      value={title}
                      onChange={(e) => SetTitle(e.target.value)}
                      required
                      autoFocus
                      placeholder="Enter project name..."
                      className="relative bg-muted/50 border-border text-gray-300 focus:border-primary/50 transition-all duration-300"
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
                    <FileText className="w-3.5 h-3.5 text-secondary" />
                    Description
                  </FieldLabel>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-secondary to-primary rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
                    <Textarea
                      value={description}
                      onChange={(e) => SetDescription(e.target.value)}
                      required
                      placeholder="Describe your project objectives..."
                      className="relative max-h-28 h-full text-gray-300 bg-muted/50 border-border focus:border-secondary/50 transition-all duration-300"
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
                      value={deadline}
                      required
                      onChange={(e) => SetDeadline(e.target.value)}
                      className="relative bg-muted/50 border-border text-gray-300 focus:border-accent/50 transition-all duration-300"
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
                    Project Cover (Optional)
                  </FieldLabel>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-secondary to-accent rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
                    <Input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="relative cursor-pointer text-gray-300 bg-muted/50 border-border hover:border-secondary/50 transition-all duration-300"
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
                      className="border-border text-gray-300 border hover:bg-muted hover:border-primary/30 transition-all duration-300"
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
                      className="relative bg-linear-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 border border-primary/50 shadow-lg transition-all duration-300"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <Spinner />
                          <span>Creating...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          <span>Create Project</span>
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
