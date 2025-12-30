"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { resetPassword } from "@/lib/auth-client";
import { EyeIcon, EyeOffIcon, Lock, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isViewNewPassword, setIsViewNewPassword] = useState(false);
  const [isViewConfirmPassword, setIsViewConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token") || undefined;

  const router = useRouter();

  if (!token) {
    toast.error("Invalid token", {
      description: "The reset link is invalid or has expired",
    });
  }

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid token", {
        description: "Cannot reset password without a valid token",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match", {
        description: "Please make sure both passwords are the same",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password too short", {
        description: "Password must be at least 8 characters long",
      });
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword({
        newPassword: confirmPassword,
        token: token,
      });

      toast.success("Password reset successfully!", {
        description: "You can now sign in with your new password",
      });

      router.push("/signin");
    } catch (err) {
      console.error(err);
      toast.error("Reset failed", {
        description:
          "An error occurred. Please try again or request a new reset link.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="space-y-4"
      onSubmit={HandleSubmit}
      style={{
        animation: "fade-in-up 0.4s ease-out 0.1s forwards",
        opacity: 0,
      }}
    >
      {/* New Password Input */}
      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-sm font-medium flex items-center gap-2"
        >
          <Lock className="w-3.5 h-3.5 text-primary" />
          New Password
        </Label>
        <div className="relative group">
          <Input
            id="password"
            type={isViewNewPassword ? "text" : "password"}
            value={newPassword}
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
            className="h-10 pr-10 transition-all duration-200"
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setIsViewNewPassword(!isViewNewPassword)}
            className="absolute right-0 top-0 h-10 px-3 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {isViewNewPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          Must be at least 8 characters long
        </p>
      </div>

      {/* Confirm Password Input */}
      <div className="space-y-2">
        <Label
          htmlFor="confirm-password"
          className="text-sm font-medium flex items-center gap-2"
        >
          <Lock className="w-3.5 h-3.5 text-primary" />
          Confirm Password
        </Label>
        <div className="relative group">
          <Input
            id="confirm-password"
            type={isViewConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            placeholder="Confirm new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-10 pr-10 transition-all duration-200"
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setIsViewConfirmPassword(!isViewConfirmPassword)}
            className="absolute right-0 top-0 h-10 px-3 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {isViewConfirmPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          disabled={isLoading || !token}
          className="button-animated w-full bg-linear-to-r from-primary to-accent hover:opacity-90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
        >
          {isLoading ? (
            <>
              <Spinner className="w-4 h-4 mr-2" />
              Resetting...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5 mr-2" />
              Reset Password
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
