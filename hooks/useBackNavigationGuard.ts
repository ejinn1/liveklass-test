"use client";

import { useEffect, useRef } from "react";

const enrollmentGuardStateKey = "__liveklassEnrollmentGuard";
const defaultMessage =
  "작성 중인 신청 정보가 있습니다. 페이지를 벗어나시겠습니까?";

type UseBackNavigationGuardOptions = {
  enabled: boolean;
  message?: string;
};

type EnrollmentGuardHistoryState = {
  [enrollmentGuardStateKey]?: boolean;
};

function isEnrollmentGuardState(state: unknown) {
  return (
    state !== null &&
    typeof state === "object" &&
    enrollmentGuardStateKey in state
  );
}

function pushGuardHistoryState() {
  const currentState =
    typeof window.history.state === "object" && window.history.state !== null
      ? window.history.state
      : {};

  window.history.pushState(
    {
      ...currentState,
      [enrollmentGuardStateKey]: true,
    } satisfies EnrollmentGuardHistoryState,
    "",
    window.location.href,
  );
}

export function useBackNavigationGuard({
  enabled,
  message = defaultMessage,
}: UseBackNavigationGuardOptions) {
  const allowBackNavigationRef = useRef(false);
  const hasGuardStateRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      allowBackNavigationRef.current = false;
      hasGuardStateRef.current = false;
      return;
    }

    if (
      !hasGuardStateRef.current &&
      !isEnrollmentGuardState(window.history.state)
    ) {
      pushGuardHistoryState();
      hasGuardStateRef.current = true;
    }

    const handlePopState = () => {
      if (allowBackNavigationRef.current) {
        return;
      }

      const confirmed = window.confirm(message);

      if (confirmed) {
        allowBackNavigationRef.current = true;
        window.history.back();
        return;
      }

      pushGuardHistoryState();
      hasGuardStateRef.current = true;
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [enabled, message]);
}
