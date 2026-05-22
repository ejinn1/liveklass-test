import { enrollmentTypes } from "@/app/constants/enrollment";
import type { Course } from "@/app/types/course";
import type { EnrollmentType } from "@/app/types/enrollment";
import { cn } from "@/app/utils/cn";
import {
  formatDateRange,
  formatPrice,
  getCourseStatus,
} from "@/app/utils/course";
import { EnrollmentTypeButton } from "@/components/enrollment/EnrollmentTypeButton";

type CourseSelectionSummaryProps = {
  selectedCourse: Course | null;
  enrollmentType: EnrollmentType | null;
  canContinue: boolean;
  onEnrollmentTypeChange: (type: EnrollmentType) => void;
  onContinue: () => void;
};

export function CourseSelectionSummary({
  selectedCourse,
  enrollmentType,
  canContinue,
  onEnrollmentTypeChange,
  onContinue,
}: CourseSelectionSummaryProps) {
  const selectedCourseStatus = selectedCourse
    ? getCourseStatus(selectedCourse)
    : null;

  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-950">선택 정보</h2>

        <div className="mt-5 min-h-36 border-b border-zinc-100 pb-5">
          {selectedCourse ? (
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-zinc-500">선택한 강의</p>
                <p className="mt-1 text-lg font-semibold text-zinc-950">
                  {selectedCourse.title}
                </p>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-500">일정</dt>
                  <dd className="text-right font-medium text-zinc-900">
                    {formatDateRange(
                      selectedCourse.startDate,
                      selectedCourse.endDate,
                    )}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-500">가격</dt>
                  <dd className="font-semibold text-zinc-950">
                    {formatPrice(selectedCourse.price)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-500">정원</dt>
                  <dd className="font-medium text-zinc-900">
                    {selectedCourse.currentEnrollment} /{" "}
                    {selectedCourse.maxCapacity}명
                  </dd>
                </div>
              </dl>
            </div>
          ) : (
            <div className="flex min-h-28 items-center text-sm leading-6 text-zinc-500">
              강의를 선택하면 제목, 가격, 일정이 여기에 표시됩니다.
            </div>
          )}
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold text-zinc-900">신청 유형</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {enrollmentTypes.map((type) => (
              <EnrollmentTypeButton
                key={type}
                selected={enrollmentType === type}
                type={type}
                onClick={onEnrollmentTypeChange}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          disabled={!canContinue}
          onClick={onContinue}
          className={cn(
            "mt-6 h-12 w-full rounded-md text-sm font-semibold transition",
            canContinue
              ? "bg-zinc-950 text-white hover:bg-zinc-800"
              : "cursor-not-allowed bg-zinc-200 text-zinc-500",
          )}
        >
          다음 단계
        </button>

        {selectedCourseStatus?.tone === "limited" ? (
          <p className="mt-3 text-xs text-amber-700">
            잔여석이 적어 신청이 조기 마감될 수 있습니다.
          </p>
        ) : null}
      </div>
    </aside>
  );
}
