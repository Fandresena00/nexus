"use client";

import { signOut } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

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
    <div className="relative group w-full">
      <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-green-to-violet-600 to-cyan-600 rounded-lg opacity-0 group-hover:opacity-30 blur transition-all duration-300" />
      <Button
        onClick={HandleSignOut}
        size="sm"
        className="relative bg-black hover:bg-gray-950 w-full bg-linear-to-r from-cyan-500/10 to-violet-600/10 hover:from-cyan-500/20 hover:to-violet-600/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-400 hover:text-cyan-300 shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all duration-300 dark"
      >
        <div className="flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          <span className="text-xs font-medium">Sign Out</span>
        </div>
      </Button>
    </div>
  );
}
