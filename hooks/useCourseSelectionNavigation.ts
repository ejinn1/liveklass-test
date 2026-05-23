"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useEnrollmentStepStore } from "@/stores/enrollmentStepStore";

type UseCourseSelectionNavigationParams = {
  canContinue: boolean;
};

export function useCourseSelectionNavigation({
  canContinue,
}: UseCourseSelectionNavigationParams) {
  const router = useRouter();
  const { currentStep, goToStep } = useEnrollmentStepStore();

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }

    router.push("/applicant");
  };

  useEffect(() => {
    goToStep(1);
  }, [goToStep]);

  return {
    currentStep,
    handleContinue,
  };
}
