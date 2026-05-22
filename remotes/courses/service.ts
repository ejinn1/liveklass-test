import type { CourseCategory, CourseListResponse } from "@/types/course";

export async function getCourses(
  category?: CourseCategory,
): Promise<CourseListResponse> {
  const searchParams = new URLSearchParams();

  if (category) {
    searchParams.set("category", category);
  }

  const queryString = searchParams.toString();
  const response = await fetch(
    queryString ? `/api/courses?${queryString}` : "/api/courses",
  );

  if (!response.ok) {
    throw new Error("강의 목록을 불러오지 못했습니다.");
  }

  return response.json() as Promise<CourseListResponse>;
}
