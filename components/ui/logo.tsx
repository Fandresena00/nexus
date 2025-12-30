export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className="relative group">
      {/* Subtle outer glow */}
      <div className="absolute -inset-2 bg-linear-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />

      {/* Gentle pulsing glow */}
      <div
        className="absolute -inset-1 bg-primary/15 blur-md rounded-lg opacity-60 group-hover:opacity-100 transition-all duration-300"
        style={{ animation: "pulse-glow 4s ease-in-out infinite" }}
      />

      {/* Main logo container */}
      <div
        className={`relative flex w-10 h-10 bg-card rounded-lg items-center justify-center border-2 border-primary/30 group-hover:border-primary/50 group-hover:scale-105 transition-all duration-300 ${className}`}
      >
        {/* Inner highlight */}
        <div className="absolute inset-0 bg-linear-to-br from-foreground/5 via-transparent to-transparent rounded-lg" />

        {/* Subtle shine effect */}
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <div
            className="absolute -inset-full bg-linear-to-r from-transparent via-foreground/10 to-transparent skew-x-12"
            style={{ animation: "shine 4s ease-in-out infinite" }}
          />
        </div>

        {/* Letter N with premium linear */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          <defs>
            {/* Premium linear */}
            <linearGradient
              id="logoGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--secondary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>

            {/* Clean subtle glow */}
            <filter id="logoGlow">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feFlood floodColor="hsl(var(--primary))" floodOpacity="0.3" />
              <feComposite in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main letter N */}
          <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fill="url(#logoGradient)"
            filter="url(#logoGlow)"
            className="font-black text-[18px]"
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            N
          </text>
        </svg>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-2 h-0.5 bg-linear-to-r from-primary to-transparent rounded-full opacity-60" />
        <div className="absolute top-0 left-0 w-0.5 h-2 bg-linear-to-b from-primary to-transparent rounded-full opacity-60" />

        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-linear-to-l from-accent to-transparent rounded-full opacity-60" />
        <div className="absolute bottom-0 right-0 w-0.5 h-2 bg-linear-to-t from-accent to-transparent rounded-full opacity-60" />

        {/* Subtle particle effects on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className="absolute top-1 left-1 w-1 h-1 bg-primary/60 rounded-full blur-[1px]"
            style={{ animation: "particle-float-1 3s ease-in-out infinite" }}
          />
          <div
            className="absolute top-2 right-1 w-0.5 h-0.5 bg-secondary/60 rounded-full blur-[1px]"
            style={{
              animation: "particle-float-2 2.5s ease-in-out infinite 0.5s",
            }}
          />
          <div
            className="absolute bottom-1 left-2 w-0.5 h-0.5 bg-accent/60 rounded-full blur-[1px]"
            style={{
              animation: "particle-float-3 2.8s ease-in-out infinite 1s",
            }}
          />
        </div>
      </div>
    </div>
  );
}
