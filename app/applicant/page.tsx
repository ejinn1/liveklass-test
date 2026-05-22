"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useEnrollmentFormStore } from "@/app/stores/enrollmentFormStore";
import { useEnrollmentStepStore } from "@/app/stores/enrollmentStepStore";
import { cn } from "@/app/utils/cn";
import { ApplicantFields } from "@/components/enrollment/ApplicantFields";
import { GroupFields } from "@/components/enrollment/GroupFields";
import { StepIndicator } from "@/components/enrollment/StepIndicator";

export default function ApplicantPage() {
  const router = useRouter();
  const { currentStep, goToStep } = useEnrollmentStepStore();
  const {
    applicant,
    enrollmentType,
    group,
    selectedCourseId,
    setApplicant,
    setGroup,
  } = useEnrollmentFormStore();

  useEffect(() => {
    goToStep(2);
  }, [goToStep]);

  useEffect(() => {
    if (!selectedCourseId || !enrollmentType) {
      router.replace("/");
    }
  }, [enrollmentType, router, selectedCourseId]);

  if (!selectedCourseId || !enrollmentType) {
    return null;
  }

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-8 sm:px-8 lg:px-10">
      <div className="mb-8 flex flex-col gap-4 border-b border-zinc-200 pb-6">
        <div>
          <p className="text-sm font-semibold text-zinc-500">Step 2</p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal text-zinc-950">
            수강생 정보를 입력하세요
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
            입력한 정보는 이전 단계로 돌아가거나 새로고침해도 유지됩니다.
          </p>
        </div>

        <StepIndicator currentStep={currentStep} />
      </div>

      <div className="space-y-5">
        <ApplicantFields applicant={applicant} onChange={setApplicant} />

        {enrollmentType === "group" ? (
          <GroupFields group={group} onChange={setGroup} />
        ) : null}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="h-12 rounded-md border border-zinc-300 px-5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-500"
        >
          이전 단계
        </button>

        <button
          type="button"
          className={cn(
            "h-12 rounded-md px-5 text-sm font-semibold transition",
            "cursor-not-allowed bg-zinc-200 text-zinc-500",
          )}
          disabled
        >
          다음 단계
        </button>
      </div>
    </section>
  );
}
