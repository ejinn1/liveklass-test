import type { ReactNode } from "react";

type EnrollmentFormFieldProps = {
  children: ReactNode;
  errorMessage?: string;
  label: string;
};

export function EnrollmentFormField({
  children,
  errorMessage,
  label,
}: EnrollmentFormFieldProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-zinc-800">
      {label}
      {children}
      {errorMessage ? (
        <span className="text-xs font-medium text-red-600">{errorMessage}</span>
      ) : null}
    </label>
  );
}
