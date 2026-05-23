import { CourseCategoryButton } from "@/components/enrollment/CourseCategoryButton";
import type { CourseCategory } from "@/types/course";

type CourseCategoryFilterProps = {
  categories: CourseCategory[];
  selectedCategory?: CourseCategory;
  onChange: (category?: CourseCategory) => void;
};

export function CourseCategoryFilter({
  categories,
  selectedCategory,
  onChange,
}: CourseCategoryFilterProps) {
  const handleCategoryClick = (category: CourseCategory) => {
    onChange(category);
  };

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <CourseCategoryButton
        selected={selectedCategory === undefined}
        onClick={onChange}
      />
      {categories.map((category) => (
        <CourseCategoryButton
          key={category}
          category={category}
          selected={selectedCategory === category}
          onClick={() => handleCategoryClick(category)}
        />
      ))}
    </div>
  );
}
