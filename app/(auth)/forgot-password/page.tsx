import { getSession } from "@/lib/auth-server";
import { KeyRound, ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ForgetPassword from "./forget-password";

export default async function page() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

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
          {/* Back Button */}
          <div
            style={{
              animation: "fade-in-left 0.4s ease-out forwards",
            }}
          >
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Sign In
            </Link>
          </div>

          {/* Icon Box */}
          <div
            className="flex justify-center"
            style={{
              animation: "fade-in-down 0.4s ease-out 0.05s forwards",
            }}
          >
            <div className="relative">
              {/* Subtle glow */}
              <div
                className="absolute -inset-2 bg-secondary/20 blur-lg rounded-full"
                style={{
                  animation: "pulse-glow 4s ease-in-out infinite",
                }}
              />

              {/* Icon container */}
              <div className="relative flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-accent border-2 border-secondary/30 shadow-lg hover:scale-110 transition-transform duration-300">
                <KeyRound className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div
            className="text-center space-y-2"
            style={{
              animation: "fade-in-up 0.4s ease-out 0.1s forwards",
            }}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
              Forgot Password?
            </h1>
            <p className="text-sm text-muted-foreground">
              No worries! Enter your email and we&apos;ll send you a reset link
            </p>
          </div>

          {/* Forgot Password Form */}
          <ForgetPassword />

          {/* Security Notice */}
          <div
            className="flex items-start gap-3 p-4 rounded-lg bg-secondary/10 border border-secondary/20"
            style={{
              animation: "fade-in-up 0.4s ease-out 0.2s forwards",
            }}
          >
            <Shield className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-semibold text-secondary mb-1">
                Secure Reset Process
              </p>
              <p className="text-muted-foreground">
                For your security, the reset link will expire in 1 hour. If you
                don&apos;t receive an email, check your spam folder.
              </p>
            </div>
          </div>

          {/* Remember Password Link */}
          <div
            className="text-center pt-2"
            style={{
              animation: "fade-in 0.4s ease-out 0.25s forwards",
            }}
          >
            <p className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link
                href="/signin"
                className="text-primary hover:text-primary/80 font-semibold transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
