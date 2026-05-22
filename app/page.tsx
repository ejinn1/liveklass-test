"use client";

import { useState } from "react";

import { cn } from "@/app/utils/cn";
import { getCourseStatus } from "@/app/utils/course";
import { CourseCard } from "@/components/enrollment/CourseCard";
import { CourseSelectionSummary } from "@/components/enrollment/CourseSelectionSummary";
import { categoryLabels } from "./constants/course";
import { mockCourseCategories, mockCourses } from "./mocks/courses/data";
import type { Course, CourseCategory } from "./types/course";
import type { EnrollmentType } from "./types/enrollment";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<
    CourseCategory | undefined
  >(undefined);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrollmentType, setEnrollmentType] = useState<EnrollmentType | null>(
    null,
  );

  const courses = selectedCategory
    ? mockCourses.filter((course) => course.category === selectedCategory)
    : mockCourses;

  const selectedCourseStatus = selectedCourse
    ? getCourseStatus(selectedCourse)
    : null;

  const canContinue =
    Boolean(selectedCourse) &&
    Boolean(enrollmentType) &&
    selectedCourseStatus?.selectable === true;

  const handleCategoryChange = (category?: CourseCategory) => {
    setSelectedCategory(category);
    setSelectedCourse(null);
  };

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-8 sm:px-8 lg:px-10">
      <div className="mb-8 flex flex-col gap-4 border-b border-zinc-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-500">Step 1</p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal text-zinc-950">
            수강할 강의를 선택하세요
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
            카테고리별 강의 목록을 확인하고 신청 유형을 선택하면 다음 단계로
            진행할 수 있습니다.
          </p>
        </div>

        <div className="flex h-10 items-center rounded-full bg-zinc-100 px-3 text-sm font-medium text-zinc-600">
          1 / 3
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleCategoryChange(undefined)}
          className={cn(
            "h-10 rounded-md border px-4 text-sm font-medium transition",
            selectedCategory === undefined
              ? "border-zinc-950 bg-zinc-950 text-white"
              : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400",
          )}
        >
          전체
        </button>
        {mockCourseCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategoryChange(category)}
            className={cn(
              "h-10 rounded-md border px-4 text-sm font-medium transition",
              selectedCategory === category
                ? "border-zinc-950 bg-zinc-950 text-white"
                : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400",
            )}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      <div className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          {courses.length === 0 ? (
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
                  onSelect={setSelectedCourse}
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
        />
      </div>
    </section>
  );
}
