import Logo from "@/components/ui/logo";

export default function Loading() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-black items-center justify-center">
      {/* Cyber grid overlay with scan animation */}
      <div className="fixed inset-0 opacity-15">
        <div
          className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-500/30 to-transparent"
          style={{
            animation: "scan 8s linear infinite",
          }}
        />
      </div>

      {/* Neon gradient orbs */}
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-[60px]"
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

      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center space-y-12">
        {/* Logo with enhanced glow */}
        <div
          className="relative"
          style={{
            animation: "fade-in 0.6s ease-out both",
          }}
        >
          {/* Outer rotating ring */}
          <div
            className="absolute -inset-8 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full opacity-30 blur-2xl"
            style={{
              animation: "rotate-glow 3s linear infinite",
            }}
          />

          {/* Middle pulsing glow */}
          <div
            className="absolute -inset-4 bg-cyan-400/30 rounded-full blur-xl"
            style={{
              animation: "pulse-slow 2s ease-in-out infinite",
            }}
          />

          {/* Logo container with scale animation */}
          <div
            className="relative"
            style={{
              animation: "scale-pulse 2s ease-in-out infinite",
            }}
          >
            <Logo className="w-10 h-10" />
          </div>
        </div>

        {/* NEXUS Text */}
        <div
          className="text-center space-y-4"
          style={{
            animation: "fade-in 0.6s ease-out 0.2s both",
          }}
        >
          <h1 className="text-4xl font-bold bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
            NEXUS
          </h1>
          <p className="text-gray-400 text-sm font-light">
            Initializing system...
          </p>
        </div>

        {/* Loading Bar */}
        <div
          className="w-64 space-y-3"
          style={{
            animation: "fade-in 0.6s ease-out 0.4s both",
          }}
        >
          {/* Progress bar container */}
          <div className="relative h-1.5 bg-gray-800/50 rounded-full overflow-hidden border border-cyan-500/20">
            {/* Animated progress fill */}
            <div
              className="absolute inset-y-0 left-0 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full"
              style={{
                animation: "loading-bar 2s ease-in-out infinite",
              }}
            />

            {/* Shimmer effect */}
            <div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
              style={{
                animation: "shimmer 1.5s ease-in-out infinite",
              }}
            />
          </div>

          {/* Loading dots */}
          <div className="flex items-center justify-center gap-2">
            <div
              className="w-2 h-2 rounded-full bg-cyan-400"
              style={{
                animation: "bounce-dot 1.4s ease-in-out infinite",
              }}
            />
            <div
              className="w-2 h-2 rounded-full bg-blue-400"
              style={{
                animation: "bounce-dot 1.4s ease-in-out 0.2s infinite",
              }}
            />
            <div
              className="w-2 h-2 rounded-full bg-purple-400"
              style={{
                animation: "bounce-dot 1.4s ease-in-out 0.4s infinite",
              }}
            />
          </div>
        </div>

        {/* Status Messages */}
        <div
          className="text-center space-y-2 min-h-[60px]"
          style={{
            animation: "fade-in 0.6s ease-out 0.6s both",
          }}
        >
          <div className="flex items-center justify-center gap-2 text-sm">
            <div
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              style={{
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />
            <p
              className="text-cyan-400 font-medium"
              style={{
                animation: "text-cycle 8s ease-in-out infinite",
              }}
            >
              Establishing secure connection
            </p>
          </div>
          <p className="text-gray-500 text-xs">
            Please wait while we prepare your workspace
          </p>
        </div>

        {/* Hexagon decorations */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
          {/* Hexagon ring 1 */}
          <div className="absolute inset-0 border border-cyan-500/10 rounded-full animate-spin">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400/50" />
          </div>

          {/* Hexagon ring 2 */}
          <div className="absolute inset-8 border border-blue-500/10 rounded-full animate-spin">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400/50" />
          </div>

          {/* Hexagon ring 3 */}
          <div className="absolute inset-16 border border-purple-500/10 rounded-full animate-spin">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
