"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import type { ApplicantInput, EnrollmentType } from "@/types/enrollment";

type UseReviewStepAccessGuardParams = {
  applicant: ApplicantInput;
  enrollmentType: EnrollmentType | null;
  hasHydrated: boolean;
  isSubmitted: boolean;
  selectedCourseId: string | null;
};

export function useReviewStepAccessGuard({
  applicant,
  enrollmentType,
  hasHydrated,
  isSubmitted,
  selectedCourseId,
}: UseReviewStepAccessGuardParams) {
  const router = useRouter();

  useEffect(() => {
    if (!hasHydrated || isSubmitted) {
      return;
    }

    if (!selectedCourseId || !enrollmentType) {
      router.replace("/");
      return;
    }

    if (!applicant.name || !applicant.email || !applicant.phone) {
      router.replace("/applicant");
    }
  }, [
    applicant.email,
    applicant.name,
    applicant.phone,
    enrollmentType,
    hasHydrated,
    isSubmitted,
    router,
    selectedCourseId,
  ]);
}
