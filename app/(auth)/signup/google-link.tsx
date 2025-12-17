"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import GoogleSvg from "@/public/google-svg";

export default function GoogleLink() {
  const socialSignUp = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="relative group/btn">
      <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500 to-pink-600 rounded-lg opacity-0 group-hover/btn:opacity-30 blur transition-all duration-300" />
      <Button
        variant="outline"
        onClick={socialSignUp}
        className="relative w-full h-10 font-medium bg-gray-800/50 border-gray-700 hover:border-purple-500/50 hover:bg-gray-800 text-gray-300 transition-all duration-300"
      >
        <GoogleSvg />
        <span>Continue with Google</span>
      </Button>
    </div>
  );
}
