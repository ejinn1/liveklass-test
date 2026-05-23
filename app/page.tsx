"use client";

import { useState } from "react";

import { CourseCategoryFilter } from "@/components/enrollment/CourseCategoryFilter";
import { CourseListSection } from "@/components/enrollment/CourseListSection";
import { CourseSelectionSummary } from "@/components/enrollment/CourseSelectionSummary";
import { EnrollmentStepHeader } from "@/components/enrollment/EnrollmentStepHeader";
import { useCourseList } from "@/hooks/useCourseList";
import { useCourseSelection } from "@/hooks/useCourseSelection";
import { useCourseSelectionNavigation } from "@/hooks/useCourseSelectionNavigation";
import type { CourseCategory } from "@/types/course";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<
    CourseCategory | undefined
  >(undefined);
  const {
    categories,
    courses,
    error: isCourseListError,
    loading: isCourseListPending,
    handleRetry: handleCourseListRetry,
  } = useCourseList(selectedCategory);

  const {
    canContinue,
    enrollmentType,
    selectedCourse,
    selectedCourseId,
    clearSelectedCourse,
    handleCourseSelect,
    setEnrollmentType,
  } = useCourseSelection({
    courses,
  });

  const { currentStep, handleContinue } = useCourseSelectionNavigation({
    canContinue,
  });

  const handleCategoryChange = (category?: CourseCategory) => {
    setSelectedCategory(category);
    clearSelectedCourse();
  };

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
