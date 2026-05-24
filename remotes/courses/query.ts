import { queryOptions } from "@tanstack/react-query";

import { getCourses } from "@/remotes/courses/service";
import type { CourseCategory } from "@/types/course";

export const courseQueryKeys = {
  all: ["courses"] as const,
  list: (category?: CourseCategory) =>
    [...courseQueryKeys.all, "list", category ?? "all"] as const,
};

export function courseListQueryOptions(category?: CourseCategory) {
  return queryOptions({
    queryKey: courseQueryKeys.list(category),
    queryFn: () => getCourses(category),
    staleTime: 1000 * 60 * 5,
  });
}
