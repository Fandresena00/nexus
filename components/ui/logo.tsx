export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className="relative group">
      {/* Animated glow background */}
      <div
        className="absolute inset-0 bg-primary/20 blur-md rounded-lg opacity-70 group-hover:opacity-100 group-hover:bg-primary/30 transition-all duration-300"
        style={{
          animation: "pulse-glow 3s ease-in-out infinite",
        }}
      />

      {/* Logo container */}
      <div
        className={`relative flex w-8 h-8 bg-linear-to-br from-primary to-secondary rounded-lg items-center justify-center border border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] group-hover:scale-105 transition-all duration-300 ${className}`}
      >
        {/* Letter N with gradient */}
        <span className="text-lg font-bold bg-linear-to-br from-white to-primary-foreground bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
          N
        </span>

        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-2 h-0.5 bg-linear-to-r from-secondary to-transparent opacity-60" />
        <div className="absolute top-0 left-0 w-0.5 h-2 bg-linear-to-b from-secondary to-transparent opacity-60" />
        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-linear-to-l from-accent to-transparent opacity-60" />
        <div className="absolute bottom-0 right-0 w-0.5 h-2 bg-linear-to-t from-accent to-transparent opacity-60" />
      </div>
    </div>
  );
}
