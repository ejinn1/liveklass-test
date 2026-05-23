import type { EnrollmentErrorResponse } from "@/utils/enrollmentSubmit";

type ReviewSubmitErrorProps = {
  disabled: boolean;
  isSubmitting: boolean;
  onRetry: () => void;
  submitError: EnrollmentErrorResponse;
};

export function ReviewSubmitError({
  disabled,
  isSubmitting,
  onRetry,
  submitError,
}: ReviewSubmitErrorProps) {
  return (
    <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4">
      <p className="text-sm font-semibold text-red-700">
        {submitError.message}
      </p>
      {submitError.details ? (
        <ul className="mt-2 grid gap-1 text-sm text-red-700">
          {Object.entries(submitError.details).map(([field, message]) => (
            <li key={field}>{message}</li>
          ))}
        </ul>
      ) : null}
      <button
        type="button"
        onClick={onRetry}
        disabled={disabled}
        className="mt-3 h-10 rounded-md border border-red-300 bg-white px-4 text-sm font-semibold text-red-700 transition hover:border-red-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "재시도 중" : "다시 시도"}
      </button>
    </div>
  );
}
