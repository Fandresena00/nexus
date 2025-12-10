"use client";

import { signOut } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "../button";

export default function SignOutButton() {
  const HandleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess() {
          redirect("/signin");
        },
        onError(error) {
          console.log(error.error.message);
        },
      },
    });
  };

  return (
    <Button onClick={HandleSignOut} size={"sm"} className="gap-2">
      <LogOut />
      <span className="text-xs">Sign out</span>
    </Button>
  );
}
