"use client";

import { useBackNavigationGuard } from "@/hooks/useBackNavigationGuard";
import { useBeforeUnloadGuard } from "@/hooks/useBeforeUnloadGuard";
import { useEnrollmentFormStore } from "@/stores/enrollmentFormStore";
import { hasEnrollmentDraft } from "@/utils/enrollmentGuard";

type UseEnrollmentNavigationGuardOptions = {
  enabled?: boolean;
};

export function useEnrollmentNavigationGuard({
  enabled = true,
}: UseEnrollmentNavigationGuardOptions = {}) {
  const enrollmentForm = useEnrollmentFormStore();
  const shouldGuardNavigation = enabled && hasEnrollmentDraft(enrollmentForm);

  useBeforeUnloadGuard(shouldGuardNavigation);
  useBackNavigationGuard({
    enabled: shouldGuardNavigation,
  });
}
