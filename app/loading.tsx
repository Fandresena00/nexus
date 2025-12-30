import Logo from "@/components/ui/logo";

export default function Loading() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background items-center justify-center">
      {/* Subtle linear orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
          style={{ animation: "float-slow 25s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"
          style={{ animation: "float-slower 30s ease-in-out infinite" }}
        />
      </div>

      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Logo with subtle glow */}
        <div
          className="relative"
          style={{ animation: "fade-in 0.4s ease-out both" }}
        >
          {/* Subtle pulsing glow */}
          <div
            className="absolute -inset-4 bg-primary/20 rounded-full blur-xl"
            style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
          />

          {/* Logo with gentle scale */}
          <div
            className="relative"
            style={{ animation: "scale-pulse 3s ease-in-out infinite" }}
          >
            <Logo className="w-16 h-16" />
          </div>
        </div>

        {/* NEXUS Text */}
        <div
          className="text-center space-y-3"
          style={{ animation: "fade-in 0.4s ease-out 0.1s both" }}
        >
          <h1 className="text-4xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-tight">
            NEXUS
          </h1>
          <p className="text-sm text-muted-foreground">
            Loading your workspace...
          </p>
        </div>

        {/* Loading Bar */}
        <div
          className="w-64 space-y-3"
          style={{ animation: "fade-in 0.4s ease-out 0.2s both" }}
        >
          {/* Progress bar */}
          <div className="relative h-1.5 bg-muted rounded-full overflow-hidden border border-border">
            {/* Animated progress fill */}
            <div
              className="absolute inset-y-0 left-0 bg-linear-to-r from-primary via-secondary to-accent rounded-full"
              style={{ animation: "loading-bar 2s ease-in-out infinite" }}
            />

            {/* Shimmer effect */}
            <div
              className="absolute inset-0 bg-linear-to-r from-transparent via-foreground/10 to-transparent"
              style={{ animation: "shimmer 1.5s ease-in-out infinite" }}
            />
          </div>

          {/* Loading dots */}
          <div className="flex items-center justify-center gap-2">
            <div
              className="w-2 h-2 rounded-full bg-primary"
              style={{ animation: "bounce-dot 1.4s ease-in-out infinite" }}
            />
            <div
              className="w-2 h-2 rounded-full bg-secondary"
              style={{ animation: "bounce-dot 1.4s ease-in-out 0.2s infinite" }}
            />
            <div
              className="w-2 h-2 rounded-full bg-accent"
              style={{ animation: "bounce-dot 1.4s ease-in-out 0.4s infinite" }}
            />
          </div>
        </div>

        {/* Status Message */}
        <div
          className="text-center min-h-[40px]"
          style={{ animation: "fade-in 0.4s ease-out 0.3s both" }}
        >
          <div className="flex items-center justify-center gap-2 text-sm">
            <div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              style={{ animation: "pulse-slow 3s ease-in-out infinite" }}
            />
            <p className="text-primary font-medium">Preparing your dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
}
