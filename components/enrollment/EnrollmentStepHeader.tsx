import type { EnrollmentStep } from "@/types/enrollment";
import { StepIndicator } from "@/components/enrollment/StepIndicator";

type EnrollmentStepHeaderProps = {
  currentStep: EnrollmentStep;
  description: string;
  title: string;
};

export function EnrollmentStepHeader({
  currentStep,
  description,
  title,
}: EnrollmentStepHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-zinc-200 pb-6">
      <div>
        <p className="text-sm font-semibold text-zinc-500">
          Step {currentStep}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-normal text-zinc-950">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
          {description}
        </p>
      </div>

      <StepIndicator currentStep={currentStep} />
    </div>
  );
}
