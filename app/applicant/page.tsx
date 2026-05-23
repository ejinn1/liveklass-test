"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";

import {
  applicantStepSchema,
  type ApplicantStepFormValues,
  type GroupApplicantStepFormValues,
} from "@/schemas/enrollment";
import { useEnrollmentNavigationGuard } from "@/hooks/useEnrollmentNavigationGuard";
import { useEnrollmentFormStore } from "@/stores/enrollmentFormStore";
import { useEnrollmentStepStore } from "@/stores/enrollmentStepStore";
import { cn } from "@/utils/cn";
import { ApplicantFields } from "@/components/enrollment/ApplicantFields";
import { GroupFields } from "@/components/enrollment/GroupFields";
import { StepIndicator } from "@/components/enrollment/StepIndicator";

export default function ApplicantPage() {
  const router = useRouter();
  const initializedFormRef = useRef(false);
  useEnrollmentNavigationGuard();

  const { currentStep, goToStep } = useEnrollmentStepStore();
  const {
    applicant,
    enrollmentType,
    group,
    hasHydrated,
    selectedCourseId,
    setApplicant,
    setGroup,
  } = useEnrollmentFormStore();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<ApplicantStepFormValues>({
    defaultValues:
      enrollmentType === "group"
        ? {
            enrollmentType,
            applicant,
            group,
          }
        : {
            enrollmentType: "personal",
            applicant,
          },
    mode: "onBlur",
    resolver: zodResolver(applicantStepSchema),
  });

  const watchedApplicant = useWatch({
    control,
    name: "applicant",
  });
  const watchedGroup = useWatch({
    control,
    name: "group",
  });

  useEffect(() => {
    goToStep(2);
  }, [goToStep]);

  useEffect(() => {
    if (!selectedCourseId || !enrollmentType) {
      router.replace("/");
    }
  }, [enrollmentType, router, selectedCourseId]);

  useEffect(() => {
    if (!hasHydrated || !enrollmentType) {
      return;
    }

    if (initializedFormRef.current) {
      return;
    }

    reset(
      enrollmentType === "group"
        ? {
            enrollmentType,
            applicant,
            group,
          }
        : {
            enrollmentType,
            applicant,
          },
    );
    initializedFormRef.current = true;
  }, [applicant, enrollmentType, group, hasHydrated, reset]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    setApplicant(watchedApplicant);
  }, [hasHydrated, setApplicant, watchedApplicant]);

  useEffect(() => {
    if (hasHydrated && enrollmentType === "group" && watchedGroup) {
      setGroup(watchedGroup);
    }
  }, [enrollmentType, hasHydrated, setGroup, watchedGroup]);

  if (!hasHydrated || !selectedCourseId || !enrollmentType) {
    return null;
  }

  const handleValidSubmit = () => {
    router.push("/review");
  };
  const handlePreviousClick = () => {
    router.push("/");
  };
  const groupErrors = errors as FieldErrors<GroupApplicantStepFormValues>;

  return (
    <form
      onSubmit={handleSubmit(handleValidSubmit)}
      className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-8 sm:px-8 lg:px-10"
    >
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
        <ApplicantFields errors={errors} register={register} />

        {enrollmentType === "group" ? (
          <GroupFields
            errors={groupErrors}
            group={watchedGroup ?? group}
            register={register}
            setValue={setValue}
          />
        ) : null}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={handlePreviousClick}
          className="h-12 rounded-md border border-zinc-300 px-5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-500"
        >
          이전 단계
        </button>

        <button
          type="submit"
          className={cn(
            "h-12 rounded-md px-5 text-sm font-semibold transition",
            "bg-zinc-950 text-white hover:bg-zinc-800",
          )}
        >
          다음 단계
        </button>
      </div>
    </form>
  );
}
