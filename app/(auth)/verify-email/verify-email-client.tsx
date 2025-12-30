"use client";

import { Button } from "@/components/ui/button";
import {
  Mail,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
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
          toast.info("Please wait", {
            description: `You can resend the email in ${remainingSeconds} seconds`,
          });
          return;
        }
      }

      const result = await resendVerificationEmail();

      if (result.success) {
        setLastSentAt(new Date());
        toast.success("Email sent!", {
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
    <div className="w-full max-w-md">
      {/* Main Card */}
      <div
        className="relative bg-card/50 backdrop-blur-xl border border-border rounded-xl shadow-lg overflow-hidden"
        style={{
          animation: "scale-in 0.4s ease-out forwards",
        }}
      >
        {/* Content */}
        <div className="p-8 md:p-10 space-y-6">
          {/* Icon Box */}
          <div
            className="flex justify-center"
            style={{
              animation: "fade-in-down 0.4s ease-out forwards",
            }}
          >
            <div className="relative">
              {/* Subtle glow */}
              <div
                className="absolute -inset-2 bg-primary/20 blur-lg rounded-full"
                style={{
                  animation: "pulse-glow 4s ease-in-out infinite",
                }}
              />

              {/* Icon container */}
              <div className="relative flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary border-2 border-primary/30 shadow-lg hover:scale-110 transition-transform duration-300">
                <Mail className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div
            className="text-center space-y-2"
            style={{
              animation: "fade-in-up 0.4s ease-out 0.05s forwards",
            }}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Verify Your Email
            </h1>
            <p className="text-sm text-muted-foreground">
              We&apos;ve sent you a verification link
            </p>
          </div>

          {/* Messages */}
          <div
            className="space-y-3"
            style={{
              animation: "fade-in-up 0.4s ease-out 0.1s forwards",
            }}
          >
            {/* Success message */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-green-600 dark:text-green-400 mb-1">
                  Verification email sent!
                </p>
                <p className="text-muted-foreground">
                  We&apos;ve sent a verification link to{" "}
                  {userEmail && (
                    <span className="font-semibold text-foreground">
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
              <div className="text-sm text-muted-foreground">
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
              animation: "fade-in-up 0.4s ease-out 0.15s forwards",
            }}
          >
            <Button
              onClick={handleResend}
              disabled={isResending}
              className="button-animated w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Footer note */}
          <div
            className="text-center text-xs text-muted-foreground pt-2 space-y-1"
            style={{
              animation: "fade-in 0.4s ease-out 0.2s forwards",
            }}
          >
            <p>Didn&apos;t receive the email? Check your spam folder.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
