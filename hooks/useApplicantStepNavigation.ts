"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { FieldErrors } from "react-hook-form";

import type { ApplicantStepFormValues } from "@/schemas/enrollment";
import { useEnrollmentStepStore } from "@/stores/enrollmentStepStore";
import {
  getFirstApplicantStepErrorName,
  scrollFieldIntoView,
} from "@/utils/applicantForm";

export function useApplicantStepNavigation() {
  const router = useRouter();
  const { currentStep, goToStep } = useEnrollmentStepStore();

  useEffect(() => {
    goToStep(2);
  }, [goToStep]);

  const handleValidSubmit = () => {
    router.push("/review");
  };

  const handleInvalidSubmit = (
    errors: FieldErrors<ApplicantStepFormValues>,
  ) => {
    const firstErrorName = getFirstApplicantStepErrorName(errors);

    if (!firstErrorName) {
      return;
    }

    scrollFieldIntoView(firstErrorName);
  };

  const handlePreviousClick = () => {
    router.push("/");
  };

  return {
    currentStep,
    handleInvalidSubmit,
    handlePreviousClick,
    handleValidSubmit,
  };
}
