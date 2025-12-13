import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckCircle2, Zap, Shield } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center px-4 md:grid-cols-2 md:px-8">
        {/* Left – Branding / Value */}
        <div className="hidden flex-col justify-center md:flex">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
              <Zap className="h-6 w-6" />
            </div>
            <span className="text-2xl font-semibold tracking-tight">Nexus</span>
          </div>

          <h1 className="mb-4 max-w-xl text-4xl font-bold leading-tight">
            Manage your projects
            <br className="hidden lg:block" />
            like a professional
          </h1>

          <p className="mb-10 max-w-xl text-muted-foreground">
            Nexus is a modern project management platform designed to improve
            collaboration, productivity, and clarity across your workflow.
          </p>

          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <div className="">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
              </div>
              <span>
                <strong>Clean and intuitive UI</strong> built for daily focus
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Zap className="mt-0.5 h-5 w-5 text-primary" />
              <span>
                <strong>Real-time productivity insights</strong>
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 text-primary" />
              <span>
                <strong>Secure by default</strong> with modern standards
              </span>
            </li>
          </ul>
        </div>

        {/* Right – Auth content */}
        <div className="flex items-center justify-center py-12">
          <Card
            className={cn(
              "w-full max-w-md p-6 shadow-lg",
              "animate-in fade-in slide-in-from-bottom-4 duration-300",
            )}
          >
            {children}

            <Separator className="my-2" />

            <p className="text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} Nexus. All rights reserved.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
