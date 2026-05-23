import { cn } from "@/utils/cn";

type EnrollmentStepActionsProps = {
  nextLabel: string;
  previousLabel?: string;
  nextButtonType?: "button" | "submit";
  nextDisabled?: boolean;
  previousDisabled?: boolean;
  onNext?: () => void;
  onPrevious: () => void;
};

export function EnrollmentStepActions({
  nextLabel,
  previousLabel = "이전 단계",
  nextButtonType = "button",
  nextDisabled = false,
  previousDisabled = false,
  onNext,
  onPrevious,
}: EnrollmentStepActionsProps) {
  return (
    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
      <button
        type="button"
        onClick={onPrevious}
        disabled={previousDisabled}
        className="h-12 cursor-pointer rounded-md border border-zinc-300 px-5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {previousLabel}
      </button>

      <button
        type={nextButtonType}
        onClick={onNext}
        disabled={nextDisabled}
        className={cn(
          "h-12 cursor-pointer rounded-md px-5 text-sm font-semibold transition",
          nextDisabled
            ? "cursor-not-allowed bg-zinc-200 text-zinc-500"
            : "bg-zinc-950 text-white hover:bg-zinc-800",
        )}
      >
        {nextLabel}
      </button>
    </div>
  );
}
