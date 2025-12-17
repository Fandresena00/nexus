"use client";

import { Lock, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import ResetPassword from "./reset-password";

export default function page() {
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
        {/* Outer slow */}
        <div className="absolute -inset-1 bg-linear-to-br from-primary via-accent to-secondary rounded-2xl opacity-20 blur-2xl" />

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
                {/* Pulsing slow */}
                <div
                  className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"
                  style={{
                    animation: "pulse-slow 3s ease-in-out infinite",
                  }}
                />

                {/* Icon container */}
                <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-primary to-accent border-2 border-white/10 shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                  <Lock className="w-10 h-10 text-white" />

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
              <h1 className="text-3xl font-bold bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Reset Password
              </h1>
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-12 bg-linear-to-r from-transparent to-primary" />
                <Sparkles className="w-4 h-4 text-primary" />
                <div className="h-px w-12 bg-linear-to-l from-transparent to-primary" />
              </div>
              <p className="text-sm text-gray-400 pt-2">
                Create a new secure password for your account.
              </p>
            </div>

            <ResetPassword />

            {/* Security Notice */}
            <div
              className="flex items-start gap-3 p-4 rounded-lg bg-accent/10 border border-accent/20"
              style={{
                animation:
                  "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.4s forwards",
                opacity: 0,
              }}
            >
              <Shield className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div className="text-xs text-gray-400">
                <p className="font-semibold text-accent mb-1">
                  Security Reminder
                </p>
                <p>
                  After resetting, you&apos;ll be logged out of all devices.
                  Please sign in again with your new password.
                </p>
              </div>
            </div>

            {/* Back to Sign In Link */}
            <div
              className="text-center pt-2"
              style={{
                animation:
                  "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.5s forwards",
                opacity: 0,
              }}
            >
              <p className="text-sm text-gray-400">
                Remember your password?{" "}
                <Link
                  href="/signin"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
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
