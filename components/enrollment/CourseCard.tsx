import { categoryLabels } from "@/constants/course";
import type { Course } from "@/types/course";
import { cn } from "@/utils/cn";
import { formatDateRange, formatPrice, getCourseStatus } from "@/utils/course";

type CourseCardProps = {
  course: Course;
  selected: boolean;
  onSelect: (course: Course) => void;
};

export function CourseCard({ course, selected, onSelect }: CourseCardProps) {
  const status = getCourseStatus(course);
  const handleSelect = () => {
    onSelect(course);
  };

  return (
    <button
      type="button"
      aria-label={`${course.title} 강의 선택`}
      disabled={!status.selectable}
      onClick={handleSelect}
      className={cn(
        "grid min-h-64 w-full cursor-pointer grid-rows-[auto_1fr_auto] rounded-lg border bg-white p-5 text-left shadow-sm transition",
        selected
          ? "border-zinc-950 ring-2 ring-zinc-950"
          : "border-zinc-200 hover:border-zinc-400 hover:shadow-md",
        !status.selectable && "cursor-not-allowed bg-zinc-50 opacity-65",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <span className="inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
            {categoryLabels[course.category]}
          </span>
          <h3 className="text-lg font-semibold text-zinc-950">
            {course.title}
          </h3>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold",
            status.tone === "available" && "bg-emerald-50 text-emerald-700",
            status.tone === "limited" && "bg-amber-50 text-amber-700",
            status.tone === "closed" && "bg-zinc-200 text-zinc-600",
          )}
        >
          {status.label}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-zinc-600">
        {course.description}
      </p>

      <div className="mt-6 grid gap-2 border-t border-zinc-100 pt-4 text-sm text-zinc-700">
        <div className="flex justify-between gap-4">
          <span className="text-zinc-500">강사</span>
          <span className="font-medium text-zinc-900">{course.instructor}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-zinc-500">일정</span>
          <span className="font-medium text-zinc-900">
            {formatDateRange(course.startDate, course.endDate)}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-zinc-500">가격</span>
          <span className="font-semibold text-zinc-950">
            {formatPrice(course.price)}
          </span>
        </div>
      </div>
    </button>
  );
}
