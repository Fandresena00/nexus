"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  addProjectAccess,
  removeProjectAccess,
  updateProjectAccessRole,
} from "@/app/actions/project-action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Users, UserPlus, Trash2, Shield, Mail } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ProjectAccess = {
  id: string;
  role: "OWNER" | "EDITOR" | "VIEWER";
  createdAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
};

type ProjectOwner = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

type ProjectAccessManagerProps = {
  projectId: string;
  currentUserId: string;
  currentUserRole: "OWNER" | "EDITOR" | "VIEWER" | null;
  accessList: ProjectAccess[];
  projectOwner: ProjectOwner;
};

export default function ProjectAccessManager({
  projectId,
  currentUserId,
  currentUserRole,
  accessList,
  projectOwner,
}: ProjectAccessManagerProps) {
  const router = useRouter();
  const [addUserEmail, setAddUserEmail] = useState("");
  const [addUserRole, setAddUserRole] = useState<"EDITOR" | "VIEWER">("VIEWER");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const canManageAccess = currentUserRole === "OWNER";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addUserEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    setLoading(true);
    try {
      await addProjectAccess(
        projectId,
        addUserEmail.trim(),
        addUserRole,
        currentUserId,
      );
      toast.success(
        `User ${addUserEmail} has been added with ${addUserRole} role`,
      );
      setAddUserEmail("");
      setAddUserRole("VIEWER");
      setOpen(false);
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to add user";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveUser = async (userId: string, userName: string) => {
    try {
      await removeProjectAccess(projectId, userId, currentUserId);
      toast.success(`${userName} has been removed from the project`);
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to remove user";
      toast.error(message);
    }
  };

  const handleUpdateRole = async (
    userId: string,
    newRole: "OWNER" | "EDITOR" | "VIEWER",
  ) => {
    try {
      await updateProjectAccessRole(projectId, userId, newRole, currentUserId);
      toast.success("User role has been updated");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update role";
      toast.error(message);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "OWNER":
        return "default";
      case "EDITOR":
        return "secondary";
      case "VIEWER":
        return "outline";
      default:
        return "outline";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "OWNER":
        return "bg-primary/20 text-primary border-primary/30";
      case "EDITOR":
        return "bg-secondary/20 text-secondary border-secondary/30";
      case "VIEWER":
        return "bg-accent/20 text-accent border-accent/30";
      default:
        return "";
    }
  };

  // Include project owner in the list if not already present
  const ownerInList = accessList.find((a) => a.user.id === projectOwner.id);
  const allAccess = [
    ...(ownerInList
      ? []
      : [
          {
            id: "owner",
            role: "OWNER" as const,
            createdAt: new Date(),
            user: projectOwner,
          },
        ]),
    ...accessList,
  ];

  return (
    <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300 dark">
      {/* Neon accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary to-transparent opacity-50" />

      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br from-primary/20 to-secondary/20 border border-primary/30">
                <Users className="w-4 h-4 text-primary" />
              </div>
              Project Access
            </CardTitle>
            <CardDescription className="mt-2">
              Manage who can access and modify this project
            </CardDescription>
          </div>
          {canManageAccess &&
            (mounted ? (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-300"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border border-primary/30 shadow-[0_0_50px_rgba(139,92,246,0.2)] dark">
                  {/* Neon glow overlay */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none rounded-lg" />

                  <DialogHeader className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-primary to-accent border border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                        <UserPlus className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <DialogTitle className="text-xl bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                          Add User to Project
                        </DialogTitle>
                        <div className="h-px w-16 bg-linear-to-r from-primary to-transparent mt-1" />
                      </div>
                    </div>
                    <DialogDescription className="text-muted-foreground">
                      Enter the email address of the user you want to add
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddUser} className="relative">
                    <FieldSet>
                      <FieldGroup className="space-y-4">
                        <Field>
                          <FieldLabel
                            htmlFor="email"
                            className="text-foreground flex items-center gap-2"
                          >
                            <Mail className="w-3.5 h-3.5 text-primary" />
                            User Email
                          </FieldLabel>
                          <div className="relative group">
                            <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-accent rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
                            <Input
                              type="email"
                              id="email"
                              value={addUserEmail}
                              onChange={(e) => setAddUserEmail(e.target.value)}
                              placeholder="user@example.com"
                              required
                              autoFocus
                              className="relative bg-muted/50 border-border text-gray-300 focus:border-primary/50 transition-all duration-300"
                            />
                          </div>
                        </Field>
                        <Field>
                          <FieldLabel
                            htmlFor="role"
                            className="text-foreground flex items-center gap-2"
                          >
                            <Shield className="w-3.5 h-3.5 text-accent" />
                            Role
                          </FieldLabel>
                          <div className="relative group">
                            <div className="absolute -inset-0.5 bg-linear-to-r from-accent to-primary rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
                            <Select
                              value={addUserRole}
                              onValueChange={(value: "EDITOR" | "VIEWER") =>
                                setAddUserRole(value)
                              }
                            >
                              <SelectTrigger
                                id="role"
                                className="relative bg-muted-foreground text-gray-300 border-border focus:border-accent/50"
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-900">
                                <SelectItem
                                  className="text-gray-300 bg-black"
                                  value="VIEWER"
                                >
                                  Viewer (Read Only)
                                </SelectItem>
                                <SelectItem
                                  className="text-gray-300 bg-black"
                                  value="EDITOR"
                                >
                                  Editor (Can Modify)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </Field>
                      </FieldGroup>
                      <FieldGroup className="mt-6">
                        <DialogFooter className="gap-3">
                          <DialogClose asChild>
                            <Button
                              variant="outline"
                              type="button"
                              className="border-border text-gray-300 hover:bg-muted hover:border-primary/30 transition-all duration-300"
                            >
                              Cancel
                            </Button>
                          </DialogClose>
                          <div className="relative group">
                            <div className="absolute -inset-1 bg-linear-to-r from-primary to-accent rounded-lg opacity-70 group-hover:opacity-100 blur transition-all duration-300" />
                            <Button
                              type="submit"
                              disabled={loading}
                              className="relative bg-linear-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border border-primary/50 shadow-lg"
                            >
                              {loading ? <Spinner /> : "Add User"}
                            </Button>
                          </div>
                        </DialogFooter>
                      </FieldGroup>
                    </FieldSet>
                  </form>
                </DialogContent>
              </Dialog>
            ) : (
              <Button variant="outline" size="sm" disabled>
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {allAccess.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-border rounded-lg bg-muted/20">
              <Users className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">
                No users have access to this project yet.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {allAccess.map((access, index) => {
                const isOwner = access.user.id === projectOwner.id;
                const isCurrentUser = access.user.id === currentUserId;
                const canModify = canManageAccess && !isOwner;

                return (
                  <div
                    key={access.id}
                    className="group relative overflow-hidden p-3 border border-border rounded-lg bg-muted/20 hover:bg-muted/40 hover:border-primary/30 transition-all duration-300"
                    style={{
                      animation: `fade-in-up 0.3s cubic-bezier(0.2, 0, 0, 1) ${index * 0.05}s forwards`,
                      opacity: 0,
                    }}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="relative flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Avatar with glow */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <Avatar className="relative w-10 h-10 border-2 border-primary/30 shadow-[0_0_10px_rgba(139,92,246,0.2)]">
                            <AvatarImage
                              src={access.user.image || undefined}
                              alt={access.user.name}
                            />
                            <AvatarFallback className="bg-linear-to-br from-primary/20 to-accent/20 text-foreground font-semibold text-sm">
                              {access.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-medium text-sm text-foreground truncate">
                              {access.user.name || "Unknown User"}
                            </p>
                            {isCurrentUser && (
                              <Badge
                                variant="outline"
                                className="text-xs bg-primary/10 text-primary border-primary/30"
                              >
                                You
                              </Badge>
                            )}
                            {isOwner && (
                              <Shield className="w-4 h-4 text-primary" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {access.user.email || "No email"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {canModify ? (
                          <Select
                            value={access.role}
                            onValueChange={(value: "EDITOR" | "VIEWER") =>
                              handleUpdateRole(access.user.id, value)
                            }
                          >
                            <SelectTrigger className="w-28 h-8 text-xs bg-muted/50 border-border hover:border-primary/50 transition-colors duration-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="VIEWER">Viewer</SelectItem>
                              <SelectItem value="EDITOR">Editor</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge
                            variant={getRoleBadgeVariant(access.role)}
                            className={getRoleColor(access.role)}
                          >
                            {access.role}
                          </Badge>
                        )}
                        {canModify && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-card/95 backdrop-blur-xl border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)] dark">
                              <div className="absolute inset-0 bg-linear-to-br from-red-500/5 via-transparent to-red-600/5 pointer-events-none rounded-lg" />
                              <AlertDialogHeader className="relative">
                                <AlertDialogTitle className="text-xl text-foreground">
                                  Remove User
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-muted-foreground">
                                  Are you sure you want to remove{" "}
                                  <span className="font-semibold text-red-400">
                                    {access.user.name}
                                  </span>{" "}
                                  from this project? They will lose all access.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="gap-2">
                                <AlertDialogCancel className="border-border hover:bg-muted">
                                  Cancel
                                </AlertDialogCancel>
                                <div className="relative group">
                                  <div className="absolute -inset-0.5 bg-linear-to-r from-red-500 to-red-600 rounded-lg opacity-70 group-hover:opacity-100 blur transition-all duration-300" />
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleRemoveUser(
                                        access.user.id,
                                        access.user.name,
                                      )
                                    }
                                    className="relative bg-linear-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white"
                                  >
                                    Remove
                                  </AlertDialogAction>
                                </div>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
