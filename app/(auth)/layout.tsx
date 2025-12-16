import Logo from "@/components/ui/logo";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-black">
      {/* Cyber grid overlay with scan animation */}
      <div className="fixed inset-0 opacity-15">
        <div
          className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-500/30 to-transparent"
          style={{
            animation: "scan 8s linear infinite",
          }}
        />
      </div>

      {/* Neon linear orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[90px]"
          style={{
            animation: "float-slow 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-lg h-128 bg-blue-600/20 rounded-full blur-[90px]"
          style={{
            animation: "float-slower 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-[60px]"
          style={{
            animation: "pulse-slow 4s ease-in-out infinite",
          }}
        />
      </div>

      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div
          className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/10 to-transparent h-1"
          style={{
            animation: "scanline 4s linear infinite",
          }}
        />
      </div>

      {/* Main container */}
      <div className="relative flex w-full max-w-7xl mx-auto z-10 px-4 sm:px-6 lg:px-8">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-1 flex-col justify-center py-12 pr-16">
          {/* Logo with glow */}
          <div
            className="mb-16"
            style={{
              animation: "fade-in 1s ease-out",
            }}
          >
            <div className="inline-flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-xl group-hover:bg-cyan-400/40 transition-all duration-300" />
                <Logo />
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
                NEXUS
              </span>
            </div>
          </div>

          {/* Headline */}
          <div
            className="mb-12 max-w-lg"
            style={{
              animation: "fade-in-up 1s ease-out 0.2s both",
            }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
              <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Secure Access
              </span>
              <br />
              <span className="text-gray-400">Portal</span>
            </h1>
            <p className="text-lg leading-relaxed text-gray-400 font-light">
              Enter the future of task management with advanced security and
              real-time intelligence.
            </p>
          </div>

          {/* Features */}
          <div
            className="space-y-4 max-w-md"
            style={{
              animation: "fade-in-up 1s ease-out 0.4s both",
            }}
          >
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-15 blur transition-all duration-300" />
              <div className="relative flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 group-hover:border-cyan-500/50 transition-all duration-300">
                <div className="shrink-0 flex w-11 h-11 bg-linear-to-br from-cyan-500/20 to-blue-600/20 rounded-lg items-center justify-center border border-cyan-400/30 transition-transform duration-300 group-hover:scale-105">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6 text-cyan-400"
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
                  <p className="text-sm text-white font-semibold">
                    Quantum Speed
                  </p>
                  <p className="text-xs text-gray-400">
                    Lightning-fast processing
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-15 blur transition-all duration-300" />
              <div className="relative flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 group-hover:border-blue-500/50 transition-all duration-300">
                <div className="shrink-0 flex w-11 h-11 bg-linear-to-br from-blue-500/20 to-purple-600/20 rounded-lg items-center justify-center border border-blue-400/30 transition-transform duration-300 group-hover:scale-105">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-400"
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
                  <p className="text-sm text-white font-semibold">
                    AI Analytics
                  </p>
                  <p className="text-xs text-gray-400">
                    Smart insights in real-time
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500 to-pink-600 rounded-xl opacity-0 group-hover:opacity-15 blur transition-all duration-300" />
              <div className="relative flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 group-hover:border-purple-500/50 transition-all duration-300">
                <div className="shrink-0 flex w-11 h-11 bg-linear-to-br from-purple-500/20 to-pink-600/20 rounded-lg items-center justify-center border border-purple-400/30 transition-transform duration-300 group-hover:scale-105">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6 text-purple-400"
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
                  <p className="text-sm text-white font-semibold">
                    Cyber Shield
                  </p>
                  <p className="text-xs text-gray-400">
                    Military-grade encryption
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status indicator */}
          <div
            className="mt-12 flex items-center gap-3 text-sm text-gray-400"
            style={{
              animation: "fade-in-up 1s ease-out 0.6s both",
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                style={{
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
              <span>System Online</span>
            </div>
            <div className="w-px h-4 bg-gray-700" />
            <span>99.9% Uptime</span>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="flex flex-1 items-center justify-center py-12 w-full lg:pl-16">
          {children}
        </div>
      </div>
    </div>
  );
}
