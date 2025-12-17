import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from "@/lib/auth-server";
import { KeyRound, Mail, ArrowLeft, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ForgetPassword from "./forget-password";

export default async function page() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

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
            {/* Back Button */}
            <div
              style={{
                animation:
                  "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.1s forwards",
                opacity: 0,
              }}
            >
              <Link
                href="/signin"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Sign In
              </Link>
            </div>

            {/* Icon Box */}
            <div
              className="flex justify-center"
              style={{
                animation:
                  "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.2s forwards",
                opacity: 0,
              }}
            >
              <div className="relative">
                {/* Pulsing glow */}
                <div
                  className="absolute inset-0 bg-secondary/20 blur-2xl rounded-full"
                  style={{
                    animation: "pulse-slow 3s ease-in-out infinite",
                  }}
                />

                {/* Icon container */}
                <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-secondary to-accent border-2 border-white/10 shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                  <KeyRound className="w-10 h-10 text-white" />

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
                  "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.3s forwards",
                opacity: 0,
              }}
            >
              <h1 className="text-3xl font-bold bg-linear-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
                Forgot Password?
              </h1>
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-12 bg-linear-to-r from-transparent to-secondary" />
                <Sparkles className="w-4 h-4 text-secondary" />
                <div className="h-px w-12 bg-linear-to-l from-transparent to-secondary" />
              </div>
              <p className="text-sm text-gray-400 pt-2">
                No worries! Enter your email and we&apos;ll send you a reset
                link.
              </p>
            </div>

            <ForgetPassword />
            {/* Security Notice */}
            <div
              className="flex items-start gap-3 p-4 rounded-lg bg-secondary/10 border border-secondary/20"
              style={{
                animation:
                  "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.5s forwards",
                opacity: 0,
              }}
            >
              <Shield className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div className="text-xs text-gray-400">
                <p className="font-semibold text-secondary mb-1">
                  Secure Reset Process
                </p>
                <p>
                  For your security, the reset link will expire in 1 hour. If
                  you don&apos;t receive an email, check your spam folder.
                </p>
              </div>
            </div>

            {/* Remember Password Link */}
            <div
              className="text-center pt-2"
              style={{
                animation:
                  "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.6s forwards",
                opacity: 0,
              }}
            >
              <p className="text-sm text-gray-400">
                Remember your password?{" "}
                <Link
                  href="/signin"
                  className="text-secondary hover:text-secondary/80 font-semibold transition-colors"
                >
                  Sign in
                </Link>
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
