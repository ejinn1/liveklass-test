"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type UseApplicantStepAccessGuardParams = {
  enrollmentType: string | null;
  selectedCourseId: string | null;
};

export function useApplicantStepAccessGuard({
  enrollmentType,
  selectedCourseId,
}: UseApplicantStepAccessGuardParams) {
  const router = useRouter();

  useEffect(() => {
    if (!selectedCourseId || !enrollmentType) {
      router.replace("/");
    }
  }, [enrollmentType, router, selectedCourseId]);
}
