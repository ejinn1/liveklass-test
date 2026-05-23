"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";

import { ApplicantFields } from "@/components/enrollment/ApplicantFields";
import { EnrollmentStepHeader } from "@/components/enrollment/EnrollmentStepHeader";
import { GroupFields } from "@/components/enrollment/GroupFields";
import { useEnrollmentNavigationGuard } from "@/hooks/useEnrollmentNavigationGuard";
import {
  applicantStepSchema,
  type ApplicantStepFormValues,
  type GroupApplicantStepFormValues,
} from "@/schemas/enrollment";
import { useEnrollmentFormStore } from "@/stores/enrollmentFormStore";
import { useEnrollmentStepStore } from "@/stores/enrollmentStepStore";
import { cn } from "@/utils/cn";

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
      className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-8 sm:px-8 lg:px-10"
    >
      <EnrollmentStepHeader
        currentStep={currentStep}
        title="수강생 정보를 입력하세요"
        description="입력한 정보는 이전 단계로 돌아가거나 새로고침해도 유지됩니다."
      />

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
