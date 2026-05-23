"use client";

import { useQuery } from "@tanstack/react-query";

import { courseListQueryOptions } from "@/remotes/courses/query";
import type { CourseCategory } from "@/types/course";

export function useCourseList(category?: CourseCategory) {
  const {
    data: courseList,
    isError,
    isPending,
    refetch,
  } = useQuery(courseListQueryOptions(category));

  const handleRetry = () => {
    void refetch();
  };

  return {
    categories: courseList?.categories ?? [],
    courses: courseList?.courses ?? [],
    error: isError,
    loading: isPending,
    handleRetry,
  };
}
