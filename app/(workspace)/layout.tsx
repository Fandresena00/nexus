import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="relative flex flex-col w-full min-h-screen bg-black">
        {/* Animated background effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)",
              backgroundSize: "4rem 4rem",
            }}
          />

          {/* Gradient orbs */}
          <div
            className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[90px]"
            style={{
              animation: "float-slow 20s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-lg h-128 bg-purple-600/5 rounded-full blur-[90px]"
            style={{
              animation: "float-slower 25s ease-in-out infinite",
            }}
          />
        </div>

        {/* Header with trigger */}
        <div className="relative z-10 top-0 backdrop-blur-lg bg-gray-950/80 border-b border-gray-800/50">
          <div className="flex items-center h-14 px-4">
            <SidebarTrigger className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 border-gray-700 hover:border-cyan-500/50" />

            {/* Breadcrumb or page title area */}
            <div className="flex-1 flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-1 h-1 rounded-full bg-cyan-400"
                  style={{
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  }}
                />
                <span className="text-sm text-gray-400">Dashboard</span>
              </div>

              {/* Optional: Quick actions or status */}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>System Online</span>
                <div
                  className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                  style={{
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="relative flex-1 z-10">{children}</div>
      </main>
    </SidebarProvider>
  );
}
