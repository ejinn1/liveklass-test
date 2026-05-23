"use client";

import { useEnrollmentFormStore } from "@/stores/enrollmentFormStore";
import type { Course } from "@/types/course";
import { getCourseStatus } from "@/utils/course";

type UseCourseSelectionParams = {
  courses: Course[];
};

export function useCourseSelection({ courses }: UseCourseSelectionParams) {
  const {
    enrollmentType,
    selectedCourseId,
    setEnrollmentType,
    setSelectedCourseId,
  } = useEnrollmentFormStore();
  const selectedCourse =
    courses.find((course) => course.id === selectedCourseId) ?? null;
  const selectedCourseStatus = selectedCourse
    ? getCourseStatus(selectedCourse)
    : null;
  const canContinue =
    Boolean(selectedCourse) &&
    Boolean(enrollmentType) &&
    selectedCourseStatus?.selectable === true;

  const handleCourseSelect = (course: Course) => {
    setSelectedCourseId(course.id);
  };

  const clearSelectedCourse = () => {
    setSelectedCourseId(null);
  };

  return {
    canContinue,
    enrollmentType,
    selectedCourse,
    selectedCourseId,
    clearSelectedCourse,
    handleCourseSelect,
    setEnrollmentType,
  };
}
