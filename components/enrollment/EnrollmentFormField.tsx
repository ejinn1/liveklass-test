import type { ReactNode } from "react";

type EnrollmentFormFieldProps = {
  children: ReactNode;
  errorMessage?: string;
  label: string;
  required?: boolean;
};

export function EnrollmentFormField({
  children,
  errorMessage,
  label,
  required = false,
}: EnrollmentFormFieldProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-zinc-800">
      <span>
        {label}
        {required ? <span className="ml-1 text-red-600">*</span> : null}
      </span>
      {children}
      {errorMessage ? (
        <span className="text-xs font-medium text-red-600">{errorMessage}</span>
      ) : null}
    </label>
  );
}
