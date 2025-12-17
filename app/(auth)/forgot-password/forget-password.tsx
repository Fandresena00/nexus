"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { requestPasswordReset } from "@/lib/auth-client";
import { KeyRound, Mail } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [lastSentAt, setLastSentAt] = useState<Date | null>(null);
  const [isSending, setIsSending] = useState(false);

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSending(true);

      // Prevent spam clicking - 60 second cooldown
      if (lastSentAt) {
        const timeSinceLastSent = Date.now() - lastSentAt.getTime();
        if (timeSinceLastSent < 60000) {
          const remainingSeconds = Math.ceil(
            (60000 - timeSinceLastSent) / 1000,
          );
          toast("Please wait", {
            description: `You can resend the email in ${remainingSeconds} seconds`,
          });
          return;
        }
      }

      await requestPasswordReset(
        {
          email: email,
          redirectTo: "/reset-password",
        },
        {
          onSuccess: () => {
            setLastSentAt(new Date());
            toast("Email sent!", {
              description:
                "Please check your inbox for the reset password link.",
            });
          },
          onError: (error) => {
            toast.error("Error", {
              description: error.error.message,
            });
          },
        },
      );
    } catch (err) {
      throw err;
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      className="space-y-6"
      style={{
        animation: "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.4s forwards",
        opacity: 0,
      }}
      onSubmit={HandleSubmit}
    >
      {/* Email Input */}
      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-gray-300 flex items-center gap-2"
        >
          <div className="flex items-center justify-center w-5 h-5 rounded bg-linear-to-br from-secondary/20 to-accent/20 border border-secondary/30">
            <Mail className="w-3 h-3 text-secondary" />
          </div>
          Email Address
        </Label>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-secondary to-accent rounded-lg opacity-0 group-focus-within:opacity-30 blur transition-opacity duration-300" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="relative bg-gray-800/50 border-gray-700 focus:border-secondary text-white placeholder:text-gray-500 h-11"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <div className="relative group">
          <div
            className="absolute -inset-0.5 bg-linear-to-r from-secondary via-primary to-accent rounded-lg opacity-30 group-hover:opacity-70 blur transition-all duration-300"
            style={{
              animation: "tilt 3s ease-in-out infinite",
            }}
          />
          <Button
            type="submit"
            disabled={isSending}
            className="relative w-full bg-linear-to-r from-cyan-600 to-purple-600 hover:from-cyan-600/90 hover:to-purple-600/90 border border-secondary/50 shadow-lg text-white font-semibold"
            size="lg"
          >
            {isSending ? (
              <>
                <Spinner />
                Sending
              </>
            ) : (
              <>
                <KeyRound className="w-5 h-5 mr-2" />
                Send Reset Link
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
