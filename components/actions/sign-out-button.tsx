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
          className="relative bg-black hover:bg-gray-950 w-full bg-linear-to-r from-cyan-500/10 to-violet-600/10 hover:from-cyan-500/20 hover:to-violet-600/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-400 hover:text-cyan-300 shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all duration-300 dark"
        >
          <div className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            <span className="text-xs font-medium">Sign Out</span>
          </div>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-card/95 backdrop-blur-xl border border-blue-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)] dark">
        {/* Neon glow overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-blue-600/5 pointer-events-none rounded-lg" />

        <AlertDialogHeader className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 border border-blue-400/50 shadow-[0_0_15px_rgba(239,68,68,0.4)]">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <AlertDialogTitle className="text-xl bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Signed out
              </AlertDialogTitle>
              <div className="h-px w-16 bg-linear-to-r from-blue-500 to-transparent mt-1" />
            </div>
          </div>

          <AlertDialogDescription className="text-muted-foreground pt-2">
            Are you sure you want to sign out?
            <br />
            <span className="text-blue-400/80">you will be disconnected.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="relative gap-3">
          <AlertDialogCancel className="text-gray-300 border-border hover:bg-muted hover:border-primary/30 transition-all duration-300">
            Cancel
          </AlertDialogCancel>

          <div className="relative group">
            <div
              className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-blue-600 rounded-lg opacity-70 group-hover:opacity-100 blur transition-all duration-300"
              style={{
                animation: "pulse-danger 2s ease-in-out infinite",
              }}
            />
            <AlertDialogAction
              onClick={HandleSignOut}
              className="relative bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white border border-blue-400/50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
