export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className="relative group">
      {/* Rotating outer glow ring */}
      <div
        className="absolute -inset-3 bg-linear-to-br from-primary/30 via-secondary/20 to-accent/30 rounded-2xl opacity-20 group-hover:opacity-40 blur-lg transition-all duration-500"
        style={{
          animation: "rotate-glow 4s linear infinite",
        }}
      />

      {/* Pulsing middle glow */}
      <div
        className="absolute -inset-1 bg-primary/20 blur-md rounded-xl opacity-70 group-hover:opacity-100 transition-all duration-300"
        style={{
          animation: "pulse-glow 3s ease-in-out infinite",
        }}
      />

      {/* Main logo container - SOLID dark background */}
      <div
        className={`relative flex w-8 h-8 bg-gray-900 rounded-lg items-center justify-center border-2 border-white/20 group-hover:scale-110 transition-all duration-300 ${className}`}
      >
        {/* Subtle inner highlight */}
        <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent rounded-lg" />

        {/* Enhanced shine effect */}
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <div
            className="absolute -inset-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12"
            style={{
              animation: "shine 3s ease-in-out infinite",
            }}
          />
        </div>

        {/* Letter N with PREMIUM GRADIENT - No Shadows */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-20"
        >
          <defs>
            {/* UPGRADED Multi-stop vibrant linear */}
            <linearGradient
              id="premiumGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              {/* Pure white highlight at top */}
              <stop offset="0%" stopColor="#ffffff">
                <animate
                  attributeName="stopColor"
                  values="#ffffff; #fefefe; #ffffff"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>

              {/* Bright cyan transitioning */}
              <stop offset="15%" stopColor="#e0f2fe" />

              {/* Vibrant cyan-blue */}
              <stop offset="30%" stopColor="#67e8f9">
                <animate
                  attributeName="stopColor"
                  values="#67e8f9; #22d3ee; #67e8f9"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>

              {/* Electric blue */}
              <stop offset="45%" stopColor="#38bdf8" />

              {/* Rich purple-blue */}
              <stop offset="60%" stopColor="#818cf8">
                <animate
                  attributeName="stopColor"
                  values="#818cf8; #6366f1; #818cf8"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>

              {/* Vibrant purple */}
              <stop offset="75%" stopColor="#a78bfa" />

              {/* Hot pink accent */}
              <stop offset="90%" stopColor="#f472b6">
                <animate
                  attributeName="stopColor"
                  values="#f472b6; #ec4899; #f472b6"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>

              {/* Deep magenta end */}
              <stop offset="100%" stopColor="#e879f9">
                <animate
                  attributeName="stopColor"
                  values="#e879f9; #d946ef; #e879f9"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>

            {/* Clean glow filter - no heavy shadows */}
            <filter id="cleanGlow">
              {/* Subtle white glow only */}
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feFlood floodColor="#ffffff" floodOpacity="0.3" />
              <feComposite in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main linear letter - clean, no shadows */}
          <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fill="url(#premiumGradient)"
            filter="url(#cleanGlow)"
            className="font-black text-[17px]"
            style={{
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              letterSpacing: "-0.05em",
            }}
          >
            N
          </text>

          {/* Subtle highlight overlay on letter */}
          <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fill="white"
            className="font-black text-[17px]"
            style={{
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              letterSpacing: "-0.05em",
              mixBlendMode: "overlay",
            }}
            opacity="0.5"
          >
            N
          </text>
        </svg>

        {/* Bright animated corner accents */}
        <div
          className="absolute top-0 left-0 w-3 h-0.5 bg-linear-to-r from-cyan-300 via-cyan-200 to-transparent rounded-full"
          style={{
            animation: "glow-pulse 2s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-0 left-0 w-0.5 h-3 bg-linear-to-b from-cyan-300 via-cyan-200 to-transparent rounded-full"
          style={{
            animation: "glow-pulse 2s ease-in-out infinite 0.5s",
          }}
        />

        <div
          className="absolute bottom-0 right-0 w-3 h-0.5 bg-linear-to-l from-pink-300 via-pink-200 to-transparent rounded-full"
          style={{
            animation: "glow-pulse 2s ease-in-out infinite 1s",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-0.5 h-3 bg-linear-to-t from-pink-300 via-pink-200 to-transparent rounded-full"
          style={{
            animation: "glow-pulse 2s ease-in-out infinite 1.5s",
          }}
        />

        {/* Diagonal accent lights */}
        <div className="absolute top-1 right-1 w-2 h-0.5 bg-linear-to-l from-purple-300/80 to-transparent rounded-full rotate-45" />
        <div className="absolute bottom-1 left-1 w-2 h-0.5 bg-linear-to-r from-purple-300/80 to-transparent rounded-full -rotate-45" />

        {/* Bright particle effects on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-cyan-300 rounded-full blur-[2px]"
            style={{
              animation: "particle-float-1 3s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-1 right-0.5 w-1 h-1 bg-pink-300 rounded-full blur-[2px]"
            style={{
              animation: "particle-float-2 2.5s ease-in-out infinite 0.5s",
            }}
          />
          <div
            className="absolute bottom-0.5 left-1 w-1 h-1 bg-purple-300 rounded-full blur-[2px]"
            style={{
              animation: "particle-float-3 2.8s ease-in-out infinite 1s",
            }}
          />
        </div>

        {/* Corner dots */}
        <div
          className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-white/60 rounded-full"
          style={{
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0.5 left-0.5 w-0.5 h-0.5 bg-white/60 rounded-full"
          style={{
            animation: "pulse 2s ease-in-out infinite 1s",
          }}
        />
      </div>
    </div>
  );
}
