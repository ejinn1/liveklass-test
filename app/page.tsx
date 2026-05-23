"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { CourseCategoryFilter } from "@/components/enrollment/CourseCategoryFilter";
import { CourseListSection } from "@/components/enrollment/CourseListSection";
import { CourseSelectionSummary } from "@/components/enrollment/CourseSelectionSummary";
import { EnrollmentStepHeader } from "@/components/enrollment/EnrollmentStepHeader";
import { courseListQueryOptions } from "@/remotes/courses/query";
import { useEnrollmentFormStore } from "@/stores/enrollmentFormStore";
import { useEnrollmentStepStore } from "@/stores/enrollmentStepStore";
import type { Course, CourseCategory } from "@/types/course";
import { getCourseStatus } from "@/utils/course";

export default function Home() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<
    CourseCategory | undefined
  >(undefined);
  const { currentStep, goToStep } = useEnrollmentStepStore();
  const {
    enrollmentType,
    selectedCourseId,
    setEnrollmentType,
    setSelectedCourseId,
  } = useEnrollmentFormStore();

  const {
    data: courseList,
    isError: isCourseListError,
    isPending: isCourseListPending,
    refetch: refetchCourseList,
  } = useQuery(courseListQueryOptions(selectedCategory));
  const courses = courseList?.courses ?? [];
  const categories = courseList?.categories ?? [];
  const selectedCourse =
    courses.find((course) => course.id === selectedCourseId) ?? null;

  const selectedCourseStatus = selectedCourse
    ? getCourseStatus(selectedCourse)
    : null;

  const canContinue =
    Boolean(selectedCourse) &&
    Boolean(enrollmentType) &&
    selectedCourseStatus?.selectable === true;

  const handleCategoryChange = (category?: CourseCategory) => {
    setSelectedCategory(category);
    setSelectedCourseId(null);
  };
  const handleCourseSelect = (course: Course) => {
    setSelectedCourseId(course.id);
  };
  const handleCourseListRetry = () => {
    void refetchCourseList();
  };

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }

    router.push("/applicant");
  };

  useEffect(() => {
    goToStep(1);
  }, [goToStep]);

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-8 sm:px-8 lg:px-10">
      <EnrollmentStepHeader
        currentStep={currentStep}
        title="수강할 강의를 선택하세요"
        description="카테고리별 강의 목록을 확인하고 신청 유형을 선택하면 다음 단계로 진행할 수 있습니다."
      />

      <CourseCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={handleCategoryChange}
      />

      <div className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <CourseListSection
          courses={courses}
          error={isCourseListError}
          loading={isCourseListPending}
          selectedCourseId={selectedCourseId}
          onRetry={handleCourseListRetry}
          onSelect={handleCourseSelect}
        />

        <CourseSelectionSummary
          selectedCourse={selectedCourse}
          enrollmentType={enrollmentType}
          canContinue={canContinue}
          onEnrollmentTypeChange={setEnrollmentType}
          onContinue={handleContinue}
        />
      </div>
    </section>
  );
}
