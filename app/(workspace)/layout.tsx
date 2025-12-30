import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Suspense } from "react";
import Loading from "../loading";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="relative flex flex-col w-full min-h-screen bg-background">
        {/* Animated background effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)",
              backgroundSize: "4rem 4rem",
            }}
          />

          {/* Gradient orbs */}
          <div
            className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[90px]"
            style={{
              animation: "float-slow 20s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[90px]"
            style={{
              animation: "float-slower 25s ease-in-out infinite",
            }}
          />
        </div>

        {/* Header with trigger */}
        <div className="relative z-10 top-0 backdrop-blur-lg bg-card/80 border-b border-border/50">
          <div className="flex items-center h-14 px-4">
            <SidebarTrigger className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 border-border hover:border-primary/50" />

            {/* Breadcrumb or page title area */}
            <div className="flex-1 flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-1 h-1 rounded-full bg-primary"
                  style={{
                    animation: "pulse-slow 3s ease-in-out infinite",
                  }}
                />
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>All Systems Operational</span>
                <div
                  className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                  style={{
                    animation: "pulse-slow 3s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <Suspense fallback={<Loading />}>
          <div className="relative flex-1 z-10">{children}</div>
        </Suspense>
      </main>
    </SidebarProvider>
  );
}
