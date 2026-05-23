import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

type EnrollmentInputProps = ComponentProps<"input">;

export function EnrollmentInput({ className, ...props }: EnrollmentInputProps) {
  return (
    <input
      className={cn(
        "h-11 rounded-md border border-zinc-300 px-3 text-sm transition outline-none focus:border-zinc-950",
        className,
      )}
      {...props}
    />
  );
}
