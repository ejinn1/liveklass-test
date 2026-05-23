import type { Course } from "@/types/course";
import { CourseCard } from "@/components/enrollment/CourseCard";
import { CourseCardSkeleton } from "@/components/enrollment/CourseCardSkeleton";

const courseSkeletonItems = [0, 1, 2, 3];

type CourseListSectionProps = {
  courses: Course[];
  error: boolean;
  loading: boolean;
  selectedCourseId: string | null;
  onRetry: () => void;
  onSelect: (course: Course) => void;
};

export function CourseListSection({
  courses,
  error,
  loading,
  selectedCourseId,
  onRetry,
  onSelect,
}: CourseListSectionProps) {
  if (loading) {
    return (
      <div className="min-w-0">
        <div className="grid gap-4 sm:grid-cols-2">
          {courseSkeletonItems.map((item) => (
            <CourseCardSkeleton key={item} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-w-0">
        <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="text-lg font-semibold text-red-700">
            강의 목록을 불러오지 못했습니다
          </h2>
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 h-10 rounded-md border border-red-300 bg-white px-4 text-sm font-semibold text-red-700 transition hover:border-red-500"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="min-w-0">
        <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-zinc-950">
            표시할 강의가 없습니다
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            다른 카테고리를 선택해 주세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <div className="grid gap-4 sm:grid-cols-2">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            selected={selectedCourseId === course.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
