import { categoryLabels } from "@/constants/course";
import type { CourseCategory } from "@/types/course";
import { cn } from "@/utils/cn";

type CourseCategoryButtonProps = {
  category?: CourseCategory;
  selected: boolean;
  onClick: (category?: CourseCategory) => void;
};

export function CourseCategoryButton({
  category,
  selected,
  onClick,
}: CourseCategoryButtonProps) {
  const handleClick = () => {
    onClick(category);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "h-10 cursor-pointer rounded-md border px-4 text-sm font-medium transition",
        selected
          ? "border-zinc-950 bg-zinc-950 text-white"
          : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400",
      )}
    >
      {category ? categoryLabels[category] : "전체"}
    </button>
  );
}
