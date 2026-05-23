import { enrollmentTypeLabels } from "@/constants/enrollment";
import type { Course } from "@/types/course";
import type { EnrollmentType } from "@/types/enrollment";
import { formatDateRange, formatPrice } from "@/utils/course";

type ReviewCourseSectionProps = {
  enrollmentType: EnrollmentType;
  onEdit: () => void;
  selectedCourse: Course;
};

export function ReviewCourseSection({
  enrollmentType,
  onEdit,
  selectedCourse,
}: ReviewCourseSectionProps) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-base font-semibold text-zinc-950">강의 정보</h2>
        <button
          type="button"
          onClick={onEdit}
          className="cursor-pointer text-sm font-semibold text-zinc-700 underline-offset-4 hover:underline"
        >
          수정
        </button>
      </div>

      <dl className="mt-4 grid gap-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-zinc-500">강의명</dt>
          <dd className="text-right font-medium text-zinc-950">
            {selectedCourse.title}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-zinc-500">일정</dt>
          <dd className="text-right font-medium text-zinc-950">
            {formatDateRange(selectedCourse.startDate, selectedCourse.endDate)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-zinc-500">가격</dt>
          <dd className="font-semibold text-zinc-950">
            {formatPrice(selectedCourse.price)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-zinc-500">신청 유형</dt>
          <dd className="font-medium text-zinc-950">
            {enrollmentTypeLabels[enrollmentType]}
          </dd>
        </div>
      </dl>
    </section>
  );
}
