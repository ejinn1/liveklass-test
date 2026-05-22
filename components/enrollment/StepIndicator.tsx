import { cn } from "@/app/utils/cn";
import type { EnrollmentStep } from "@/app/types/enrollment";

const steps: Array<{ step: EnrollmentStep; label: string }> = [
  { step: 1, label: "강의 선택" },
  { step: 2, label: "정보 입력" },
  { step: 3, label: "확인 및 제출" },
];

type StepIndicatorProps = {
  currentStep: EnrollmentStep;
};

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <ol className="flex w-full flex-col gap-2 sm:flex-row">
      {steps.map(({ step, label }) => {
        const active = currentStep === step;
        const completed = currentStep > step;

        return (
          <li
            key={step}
            className={cn(
              "flex flex-1 items-center gap-3 rounded-md border px-4 py-3 text-sm font-medium",
              active && "border-zinc-950 bg-zinc-950 text-white",
              completed && "border-zinc-300 bg-zinc-100 text-zinc-700",
              !active && !completed && "border-zinc-200 bg-white text-zinc-500",
            )}
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                active && "bg-white text-zinc-950",
                completed && "bg-zinc-800 text-white",
                !active && !completed && "bg-zinc-100 text-zinc-500",
              )}
            >
              {step}
            </span>
            <span>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
