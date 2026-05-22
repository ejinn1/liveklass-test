import { mockCourseCategories, mockCourses } from "@/app/mocks/courses/data";
import { courseCategories, CourseCategory } from "@/app/types/courses";

function isCourseCategory(value: string): value is CourseCategory {
  return courseCategories.includes(value as CourseCategory);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const courses =
    category === null
      ? mockCourses
      : isCourseCategory(category)
        ? mockCourses.filter((course) => course.category === category)
        : [];

  return Response.json({
    courses,
    categories: mockCourseCategories,
  });
}
