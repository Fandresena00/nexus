"use client";

import { Button } from "@/components/ui/button";
import {
  Mail,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { resendVerificationEmail } from "@/app/actions/email-verification";
import { toast } from "sonner";

interface VerifyEmailPageProps {
  userEmail?: string;
}

export function VerifyEmailPage({ userEmail }: VerifyEmailPageProps) {
  const [isResending, setIsResending] = useState(false);
  const [lastSentAt, setLastSentAt] = useState<Date | null>(null);

  const handleResend = async () => {
    try {
      setIsResending(true);

      // Prevent spam clicking - 60 second cooldown
      if (lastSentAt) {
        const timeSinceLastSent = Date.now() - lastSentAt.getTime();
        if (timeSinceLastSent < 60000) {
          const remainingSeconds = Math.ceil(
            (60000 - timeSinceLastSent) / 1000,
          );
          toast.message("Please wait", {
            description: `You can resend the email in ${remainingSeconds} seconds`,
          });
          return;
        }
      }

      const result = await resendVerificationEmail();

      if (result.success) {
        setLastSentAt(new Date());
        toast("Email sent!", {
          description: "Please check your inbox for the verification link.",
        });
      } else {
        toast.error("Error", {
          description: result.error || "Failed to send verification email",
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: "An unexpected error occurred. Please try again.",
      });
      console.log(error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-md dark">
      {/* Main Card */}
      <div
        className="relative"
        style={{
          animation: "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) forwards",
          opacity: 0,
        }}
      >
        {/* Outer glow */}
        <div className="absolute -inset-1 bg-linear-to-br from-primary via-secondary to-accent rounded-2xl opacity-20 blur-2xl" />

        {/* Card */}
        <div className="relative bg-gray-900/90 backdrop-blur-xl border border-primary/30 rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.3)] overflow-hidden">
          {/* Top neon border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />

          {/* Content */}
          <div className="p-8 md:p-10 space-y-8">
            {/* Icon Box */}
            <div
              className="flex justify-center"
              style={{
                animation:
                  "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.1s forwards",
                opacity: 0,
              }}
            >
              <div className="relative">
                {/* Pulsing glow */}
                <div
                  className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"
                  style={{
                    animation: "pulse-slow 3s ease-in-out infinite",
                  }}
                />

                {/* Icon container */}
                <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-primary to-secondary border-2 border-white/10 shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                  <Mail className="w-10 h-10 text-white" />

                  {/* Corner accents */}
                  <div className="absolute top-1 left-1 w-4 h-0.5 bg-linear-to-r from-cyan-300 to-transparent rounded-full" />
                  <div className="absolute top-1 left-1 w-0.5 h-4 bg-linear-to-b from-cyan-300 to-transparent rounded-full" />
                  <div className="absolute bottom-1 right-1 w-4 h-0.5 bg-linear-to-l from-pink-300 to-transparent rounded-full" />
                  <div className="absolute bottom-1 right-1 w-0.5 h-4 bg-linear-to-t from-pink-300 to-transparent rounded-full" />
                </div>
              </div>
            </div>

            {/* Title */}
            <div
              className="text-center space-y-3"
              style={{
                animation:
                  "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.2s forwards",
                opacity: 0,
              }}
            >
              <h1 className="text-3xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Verify Your Email
              </h1>
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-12 bg-linear-to-r from-transparent to-primary" />
                <Sparkles className="w-4 h-4 text-primary" />
                <div className="h-px w-12 bg-linear-to-l from-transparent to-primary" />
              </div>
            </div>

            {/* Message */}
            <div
              className="space-y-4"
              style={{
                animation:
                  "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.3s forwards",
                opacity: 0,
              }}
            >
              {/* Success message */}
              <div className="flex items-start gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <p className="font-semibold text-green-400 mb-1">
                    Verification email sent!
                  </p>
                  <p>
                    We&apos;ve sent a verification link to{" "}
                    {userEmail && (
                      <span className="font-semibold text-green-300">
                        {userEmail}
                      </span>
                    )}
                    {!userEmail && "your email address"}.
                  </p>
                </div>
              </div>

              {/* Info message */}
              <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <p>
                    Please check your inbox and click the verification link to
                    access your workspace. The link will expire in 1 hour.
                  </p>
                </div>
              </div>
            </div>

            {/* Resend Button */}
            <div
              className="pt-2"
              style={{
                animation:
                  "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.4s forwards",
                opacity: 0,
              }}
            >
              <div className="relative group">
                <div
                  className="absolute -inset-0.5 bg-linear-to-r from-primary via-secondary to-accent rounded-lg opacity-70 group-hover:opacity-100 blur transition-all duration-300"
                  style={{
                    animation: "tilt 3s ease-in-out infinite",
                  }}
                />
                <Button
                  onClick={handleResend}
                  disabled={isResending}
                  className="relative w-full bg-linear-to-r from-purple-700 to-cyan-600 hover:from-purple-700/90 hover:to-cyan-600/90 border border-primary/50 shadow-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2" />
                      Resend Verification Email
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Footer note */}
            <div
              className="text-center text-xs text-gray-500 pt-2"
              style={{
                animation:
                  "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.5s forwards",
                opacity: 0,
              }}
            >
              <p>
                Didn&apos;t receive the email? Check your spam folder or click
                resend.
              </p>
            </div>
          </div>

          {/* Bottom neon border */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent to-transparent" />
        </div>
      </div>
    </div>
  );
}
