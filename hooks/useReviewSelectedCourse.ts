"use client";

import { useQuery } from "@tanstack/react-query";

import { courseListQueryOptions } from "@/remotes/courses/query";

type UseReviewSelectedCourseParams = {
  selectedCourseId: string | null;
};

export function useReviewSelectedCourse({
  selectedCourseId,
}: UseReviewSelectedCourseParams) {
  const {
    data: courseList,
    isError,
    isPending,
    refetch,
  } = useQuery({
    ...courseListQueryOptions(),
    enabled: Boolean(selectedCourseId),
  });

  const selectedCourse =
    courseList?.courses.find((course) => course.id === selectedCourseId) ??
    null;

  const handleRetry = () => {
    void refetch();
  };

  return {
    error: isError,
    loading: isPending,
    selectedCourse,
    handleRetry,
  };
}
