"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useEnrollmentStepStore } from "@/stores/enrollmentStepStore";

export function useReviewStepNavigation() {
  const router = useRouter();
  const { currentStep, goToStep } = useEnrollmentStepStore();

  useEffect(() => {
    goToStep(3);
  }, [goToStep]);

  const handleCourseEditClick = () => {
    router.push("/");
  };

  const handleApplicantEditClick = () => {
    router.push("/applicant");
  };

  const handlePreviousClick = () => {
    router.push("/applicant");
  };

  return {
    currentStep,
    handleApplicantEditClick,
    handleCourseEditClick,
    handlePreviousClick,
  };
}
