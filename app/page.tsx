"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { CourseCard } from "@/components/enrollment/CourseCard";
import { CourseCardSkeleton } from "@/components/enrollment/CourseCardSkeleton";
import { CourseCategoryFilter } from "@/components/enrollment/CourseCategoryFilter";
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
        <div>
          {isCourseListPending ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <CourseCardSkeleton key={index} />
              ))}
            </div>
          ) : isCourseListError ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
              <h2 className="text-lg font-semibold text-red-700">
                강의 목록을 불러오지 못했습니다
              </h2>
              <button
                type="button"
                onClick={handleCourseListRetry}
                className="mt-4 h-10 rounded-md border border-red-300 bg-white px-4 text-sm font-semibold text-red-700 transition hover:border-red-500"
              >
                다시 시도
              </button>
            </div>
          ) : courses.length === 0 ? (
            <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center">
              <h2 className="text-lg font-semibold text-zinc-950">
                표시할 강의가 없습니다
              </h2>
              <p className="mt-2 text-sm text-zinc-600">
                다른 카테고리를 선택해 주세요.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  selected={selectedCourse?.id === course.id}
                  onSelect={handleCourseSelect}
                />
              ))}
            </div>
          )}
        </div>

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
