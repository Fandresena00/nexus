import Logo from "@/components/ui/logo";
import React, { Suspense } from "react";
import Loading from "../loading";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background">
      {/* Subtle gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
          style={{ animation: "float-slow 25s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"
          style={{ animation: "float-slower 30s ease-in-out infinite" }}
        />
      </div>

      {/* Main container */}
      <div className="relative flex w-full max-w-7xl mx-auto z-10 px-4 sm:px-6 lg:px-8">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-1 flex-col justify-center py-12 pr-16">
          {/* Logo */}
          <div className="mb-16" style={{ animation: "fade-in 0.4s ease-out" }}>
            <div className="inline-flex items-center gap-3 group cursor-pointer transition-transform duration-200 hover:scale-105">
              <Logo />
              <span className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                NEXUS
              </span>
            </div>
          </div>

          {/* Headline */}
          <div
            className="mb-12 max-w-lg"
            style={{ animation: "fade-in-up 0.4s ease-out 0.1s both" }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Get Started
              </span>
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Create your account and unlock powerful project management tools
              to help you and your team succeed.
            </p>
          </div>

          {/* Features */}
          <div
            className="space-y-4 max-w-md"
            style={{ animation: "fade-in-up 0.4s ease-out 0.2s both" }}
          >
            {/* Feature 1 */}
            <div className="card-interactive group">
              <div className="flex items-center gap-4">
                <div className="shrink-0 flex w-11 h-11 bg-primary/10 rounded-lg items-center justify-center border border-primary/20 transition-transform duration-200 group-hover:scale-105">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6 text-primary"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold">Fast & Efficient</p>
                  <p className="text-xs text-muted-foreground">
                    Lightning-fast performance
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card-interactive group">
              <div className="flex items-center gap-4">
                <div className="shrink-0 flex w-11 h-11 bg-secondary/10 rounded-lg items-center justify-center border border-secondary/20 transition-transform duration-200 group-hover:scale-105">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6 text-secondary"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold">Smart Analytics</p>
                  <p className="text-xs text-muted-foreground">
                    Insights in real-time
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card-interactive group">
              <div className="flex items-center gap-4">
                <div className="shrink-0 flex w-11 h-11 bg-accent/10 rounded-lg items-center justify-center border border-accent/20 transition-transform duration-200 group-hover:scale-105">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6 text-accent"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold">Secure Access</p>
                  <p className="text-xs text-muted-foreground">
                    Enterprise-grade security
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status indicator */}
          <div
            className="mt-12 flex items-center gap-3 text-sm text-muted-foreground"
            style={{ animation: "fade-in-up 0.4s ease-out 0.3s both" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full bg-green-500"
                style={{ animation: "pulse-slow 3s ease-in-out infinite" }}
              />
              <span>All Systems Operational</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <span>99.9% Uptime</span>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <Suspense fallback={<Loading />}>
          <div className="flex flex-1 items-center justify-center py-12 w-full lg:pl-16">
            {children}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
