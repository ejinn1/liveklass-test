"use client";

import { useEffect, useRef } from "react";

import { useEnrollmentFormStore } from "@/stores/enrollmentFormStore";

type UseEnrollmentNavigationGuardOptions = {
  enabled?: boolean;
};

function hasText(value: string) {
  return value.trim().length > 0;
}

export function useEnrollmentNavigationGuard({
  enabled = true,
}: UseEnrollmentNavigationGuardOptions = {}) {
  const allowBackNavigationRef = useRef(false);
  const { applicant, enrollmentType, group, selectedCourseId } =
    useEnrollmentFormStore();

  const hasApplicantInput =
    hasText(applicant.name) ||
    hasText(applicant.email) ||
    hasText(applicant.phone) ||
    hasText(applicant.motivation);
  const hasGroupInput =
    hasText(group.organizationName) ||
    group.headCount !== 2 ||
    hasText(group.contactPerson) ||
    group.participants.some(
      (participant) => hasText(participant.name) || hasText(participant.email),
    );
  const shouldPreventUnload =
    enabled &&
    (Boolean(selectedCourseId) ||
      Boolean(enrollmentType) ||
      hasApplicantInput ||
      hasGroupInput);

  useEffect(() => {
    if (!shouldPreventUnload) {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [shouldPreventUnload]);

  useEffect(() => {
    if (!shouldPreventUnload) {
      return;
    }

    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      if (allowBackNavigationRef.current) {
        return;
      }

      const confirmed = window.confirm(
        "작성 중인 신청 정보가 있습니다. 페이지를 벗어나시겠습니까?",
      );

      if (confirmed) {
        allowBackNavigationRef.current = true;
        window.history.back();
        return;
      }

      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [shouldPreventUnload]);
}
