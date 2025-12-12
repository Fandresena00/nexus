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
import { Users, UserPlus, Trash2, Shield } from "lucide-react";
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Project Access
            </CardTitle>
            <CardDescription>
              Manage who can access and modify this project
            </CardDescription>
          </div>
          {canManageAccess &&
            (mounted ? (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add User to Project</DialogTitle>
                    <DialogDescription>
                      Enter the email address of the user you want to add
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddUser}>
                    <FieldSet>
                      <FieldGroup>
                        <Field>
                          <FieldLabel htmlFor="email">User Email</FieldLabel>
                          <Input
                            type="email"
                            id="email"
                            value={addUserEmail}
                            onChange={(e) => setAddUserEmail(e.target.value)}
                            placeholder="user@example.com"
                            required
                            autoFocus
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="role">Role</FieldLabel>
                          <Select
                            value={addUserRole}
                            onValueChange={(value: "EDITOR" | "VIEWER") =>
                              setAddUserRole(value)
                            }
                          >
                            <SelectTrigger id="role">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="VIEWER">
                                Viewer (Read Only)
                              </SelectItem>
                              <SelectItem value="EDITOR">
                                Editor (Can Modify)
                              </SelectItem>
                            </SelectContent>
                          </Select>
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
                            {loading ? <Spinner /> : "Add User"}
                          </Button>
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
        <div className="space-y-4">
          {allAccess.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No users have access to this project yet.
            </p>
          ) : (
            <div className="space-y-3">
              {allAccess.map((access) => {
                const isOwner = access.user.id === projectOwner.id;
                const isCurrentUser = access.user.id === currentUserId;
                const canModify = canManageAccess && !isOwner;

                return (
                  <div
                    key={access.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={access.user.image || undefined}
                          alt={access.user.name}
                        />
                        <AvatarFallback>
                          {access.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm truncate">
                            {access.user.name || "Unknown User"}
                          </p>
                          {isCurrentUser && (
                            <Badge variant="outline" className="text-xs">
                              You
                            </Badge>
                          )}
                          {isOwner && (
                            <Shield className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {access.user.email || "No email"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {canModify ? (
                          <Select
                            value={access.role}
                            onValueChange={(value: "EDITOR" | "VIEWER") =>
                              handleUpdateRole(access.user.id, value)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="VIEWER">Viewer</SelectItem>
                              <SelectItem value="EDITOR">Editor</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge variant={getRoleBadgeVariant(access.role)}>
                            {access.role}
                          </Badge>
                        )}
                        {canModify && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remove User</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove{" "}
                                  <strong>{access.user.name}</strong> from this
                                  project? They will lose all access.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleRemoveUser(
                                      access.user.id,
                                      access.user.name,
                                    )
                                  }
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Remove
                                </AlertDialogAction>
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
