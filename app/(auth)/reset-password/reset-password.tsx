"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { resetPassword } from "@/lib/auth-client";
import { EyeIcon, EyeOffIcon, Lock } from "lucide-react";
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
    toast("invalid token or missing");
  }

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (newPassword === confirmPassword) {
        await resetPassword({
          newPassword: confirmPassword,
          token: token,
        });
        console.log(token);
        router.push("/signin");
        toast.message("password reset", {
          description: "password have been reset",
        });
      } else {
        toast.error("password don't match");
      }
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="space-y-6"
      onSubmit={HandleSubmit}
      style={{
        animation: "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.3s forwards",
        opacity: 0,
      }}
    >
      {/* New Password Input */}
      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-gray-300 flex items-center gap-2"
        >
          <div className="flex items-center justify-center w-5 h-5 rounded bg-linear-to-br from-primary/20 to-accent/20 border border-primary/30">
            <Lock className="w-3 h-3 text-primary" />
          </div>
          New Password
        </Label>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-accent rounded-lg opacity-0 group-focus-within:opacity-30 blur transition-opacity duration-300" />
          <Input
            id="password"
            type="password"
            value={newPassword}
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
            className="relative bg-gray-800/50 border-gray-700 focus:border-primary text-white placeholder:text-gray-500 h-11 pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setIsViewNewPassword(!isViewNewPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            {isViewNewPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password Input */}
      <div className="space-y-2">
        <Label
          htmlFor="confirm-password"
          className="text-gray-300 flex items-center gap-2"
        >
          <div className="flex items-center justify-center w-5 h-5 rounded bg-linear-to-br from-accent/20 to-secondary/20 border border-accent/30">
            <Lock className="w-3 h-3 text-accent" />
          </div>
          Confirm Password
        </Label>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-accent to-secondary rounded-lg opacity-0 group-focus-within:opacity-30 blur transition-opacity duration-300" />
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            placeholder="Confirm new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="relative bg-gray-800/50 border-gray-700 focus:border-accent text-white placeholder:text-gray-500 h-11 pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setIsViewConfirmPassword(!isViewConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
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
        <div className="relative group">
          <div
            className="absolute -inset-1 bg-linear-to-r from-primary via-accent to-secondary rounded-lg opacity-70 group-hover:opacity-100 blur transition-all duration-300"
            style={{
              animation: "tilt 3s ease-in-out infinite",
            }}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="relative w-full bg-linear-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border border-primary/50 shadow-lg text-white font-semibold"
            size="lg"
          >
            {isLoading ? (
              <>
                <Spinner />
                loading ...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Reset Password
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
