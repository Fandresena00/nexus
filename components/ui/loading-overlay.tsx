"use client";
import { Spinner } from "./spinner";

export default function LoadingOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(255,255,255,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-busy={true}
      aria-label="Loading page"
      role="status"
    >
      <Spinner className="w-16 h-16 text-blue-600" />
    </div>
  );
}
