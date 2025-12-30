"use client";

import { signOut } from "@/lib/auth-client";
import { AlertTriangle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
} from "../ui/alert-dialog";

export default function SignOutButton() {
  const router = useRouter();

  const HandleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess() {
          router.push("/signin");
        },
        onError(error) {
          console.log(error.error.message);
        },
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="button-animated w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span className="text-xs font-medium">Sign Out</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-card/95 backdrop-blur-xl border border-border">
        {/* Subtle linear overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-destructive/5 via-transparent to-destructive/5 pointer-events-none rounded-lg" />

        <AlertDialogHeader className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-destructive/10 border border-destructive/30">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <AlertDialogTitle className="text-xl">Sign Out</AlertDialogTitle>
              <div className="h-px w-16 bg-linear-to-r from-destructive/50 to-transparent mt-1" />
            </div>
          </div>

          <AlertDialogDescription className="text-muted-foreground pt-2">
            Are you sure you want to sign out? You will need to sign in again to
            access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="relative gap-3">
          <AlertDialogCancel className="button-animated">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={HandleSignOut}
            className="button-animated bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
