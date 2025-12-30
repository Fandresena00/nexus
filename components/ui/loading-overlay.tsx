"use client";
import { Spinner } from "./spinner";

export default function LoadingOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="bg-background/80 backdrop-blur-sm"
      aria-busy={true}
      aria-label="Loading page"
      role="status"
    >
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"
          style={{ animation: "pulse-slow 4s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]"
          style={{ animation: "pulse-slow 4s ease-in-out infinite 1s" }}
        />
      </div>

      {/* Spinner */}
      <div className="relative flex flex-col items-center gap-4">
        <Spinner className="w-12 h-12 text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
