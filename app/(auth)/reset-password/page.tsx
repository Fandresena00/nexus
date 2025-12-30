"use client";

import { Lock, Shield } from "lucide-react";
import Link from "next/link";
import ResetPassword from "./reset-password";

export default function page() {
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
              <div className="relative flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent border-2 border-primary/30 shadow-lg hover:scale-110 transition-transform duration-300">
                <Lock className="w-8 h-8 text-primary-foreground" />
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Reset Password
            </h1>
            <p className="text-sm text-muted-foreground">
              Create a new secure password for your account
            </p>
          </div>

          {/* Reset Password Form */}
          <ResetPassword />

          {/* Security Notice */}
          <div
            className="flex items-start gap-3 p-4 rounded-lg bg-accent/10 border border-accent/20"
            style={{
              animation: "fade-in-up 0.4s ease-out 0.15s forwards",
            }}
          >
            <Shield className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-semibold text-accent mb-1">
                Security Reminder
              </p>
              <p className="text-muted-foreground">
                After resetting, you&apos;ll be logged out of all devices.
                Please sign in again with your new password.
              </p>
            </div>
          </div>

          {/* Back to Sign In Link */}
          <div
            className="text-center pt-2"
            style={{
              animation: "fade-in 0.4s ease-out 0.2s forwards",
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
