"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import GoogleSvg from "@/public/google-svg";

export default function GoogleLink() {
  const socialLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <Button
      variant="outline"
      onClick={socialLogin}
      className="button-animated w-full h-10 font-medium"
    >
      <GoogleSvg />
      <span>Continue with Google</span>
    </Button>
  );
}
