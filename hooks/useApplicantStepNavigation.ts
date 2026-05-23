"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useEnrollmentStepStore } from "@/stores/enrollmentStepStore";

export function useApplicantStepNavigation() {
  const router = useRouter();
  const { currentStep, goToStep } = useEnrollmentStepStore();

  useEffect(() => {
    goToStep(2);
  }, [goToStep]);

  const handleValidSubmit = () => {
    router.push("/review");
  };

  const handlePreviousClick = () => {
    router.push("/");
  };

  return {
    currentStep,
    handlePreviousClick,
    handleValidSubmit,
  };
}
