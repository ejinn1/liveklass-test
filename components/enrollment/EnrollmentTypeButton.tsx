import { enrollmentTypeLabels } from "@/app/constants/enrollment";
import type { EnrollmentType } from "@/app/types/enrollment";
import { cn } from "@/app/utils/cn";

type EnrollmentTypeButtonProps = {
  selected: boolean;
  type: EnrollmentType;
  onClick: (type: EnrollmentType) => void;
};

export function EnrollmentTypeButton({
  selected,
  type,
  onClick,
}: EnrollmentTypeButtonProps) {
  const handleClick = () => {
    onClick(type);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "h-11 rounded-md border text-sm font-semibold transition",
        selected
          ? "border-zinc-950 bg-zinc-950 text-white"
          : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400",
      )}
    >
      {enrollmentTypeLabels[type]}
    </button>
  );
}
