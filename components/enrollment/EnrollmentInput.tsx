import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

type EnrollmentInputProps = ComponentProps<"input"> & {
  invalid?: boolean;
};

export function EnrollmentInput({
  className,
  invalid = false,
  ...props
}: EnrollmentInputProps) {
  return (
    <input
      className={cn(
        "h-11 rounded-md border border-zinc-300 px-3 text-sm transition outline-none focus:border-zinc-950",
        invalid && "border-red-400 bg-red-50 focus:border-red-500",
        className,
      )}
      {...props}
    />
  );
}
