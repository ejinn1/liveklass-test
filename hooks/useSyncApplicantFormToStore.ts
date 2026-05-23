"use client";

import { useEffect } from "react";

import { useEnrollmentFormStore } from "@/stores/enrollmentFormStore";
import type {
  ApplicantInput,
  EnrollmentType,
  GroupInput,
} from "@/types/enrollment";

type UseSyncApplicantFormToStoreParams = {
  enrollmentType: EnrollmentType | null;
  hasHydrated: boolean;
  watchedApplicant: ApplicantInput;
  watchedGroup?: GroupInput;
};

export function useSyncApplicantFormToStore({
  enrollmentType,
  hasHydrated,
  watchedApplicant,
  watchedGroup,
}: UseSyncApplicantFormToStoreParams) {
  const { setApplicant, setGroup } = useEnrollmentFormStore();

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    setApplicant(watchedApplicant);
  }, [hasHydrated, setApplicant, watchedApplicant]);

  useEffect(() => {
    if (!hasHydrated || enrollmentType !== "group" || !watchedGroup) {
      return;
    }

    setGroup(watchedGroup);
  }, [enrollmentType, hasHydrated, setGroup, watchedGroup]);
}
