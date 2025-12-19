import { LucideLoader } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LucideLoader
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin text-white", className)}
      {...props}
    />
  );
}

export { Spinner };
