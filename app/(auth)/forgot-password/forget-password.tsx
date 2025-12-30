"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { requestPasswordReset } from "@/lib/auth-client";
import { KeyRound, Mail, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [lastSentAt, setLastSentAt] = useState<Date | null>(null);
  const [isSending, setIsSending] = useState(false);

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSending(true);

    try {
      // Prevent spam clicking - 60 second cooldown
      if (lastSentAt) {
        const timeSinceLastSent = Date.now() - lastSentAt.getTime();
        if (timeSinceLastSent < 60000) {
          const remainingSeconds = Math.ceil(
            (60000 - timeSinceLastSent) / 1000,
          );
          toast.info("Please wait", {
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
            toast.success("Email sent!", {
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
      console.error(err);
      toast.error("Error", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      className="space-y-4"
      style={{
        animation: "fade-in-up 0.4s ease-out 0.15s forwards",
        opacity: 0,
      }}
      onSubmit={HandleSubmit}
    >
      {/* Email Input */}
      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-sm font-medium flex items-center gap-2"
        >
          <Mail className="w-3.5 h-3.5 text-primary" />
          Email Address
        </Label>
        <div className="relative group">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="h-10 transition-all duration-200"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSending}
          className="button-animated w-full bg-linear-to-r from-secondary to-accent hover:opacity-90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
        >
          {isSending ? (
            <>
              <Spinner className="w-4 h-4 mr-2" />
              Sending...
            </>
          ) : (
            <>
              <KeyRound className="w-5 h-5 mr-2" />
              Send Reset Link
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
