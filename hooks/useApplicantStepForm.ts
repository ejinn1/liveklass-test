"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  applicantStepSchema,
  type ApplicantStepFormValues,
} from "@/schemas/enrollment";
import type {
  ApplicantInput,
  EnrollmentType,
  GroupInput,
} from "@/types/enrollment";

type UseApplicantStepFormParams = {
  applicant: ApplicantInput;
  enrollmentType: EnrollmentType | null;
  group: GroupInput;
  hasHydrated: boolean;
};

export function useApplicantStepForm({
  applicant,
  enrollmentType,
  group,
  hasHydrated,
}: UseApplicantStepFormParams) {
  const initializedFormRef = useRef(false);

  const form = useForm<ApplicantStepFormValues>({
    defaultValues:
      enrollmentType === "group"
        ? {
            enrollmentType,
            applicant,
            group,
          }
        : {
            enrollmentType: "personal",
            applicant,
          },
    mode: "onBlur",
    resolver: zodResolver(applicantStepSchema),
  });
  const { control, reset } = form;

  const watchedApplicant = useWatch({
    control,
    name: "applicant",
  });
  const watchedGroup = useWatch({
    control,
    name: "group",
  });

  useEffect(() => {
    if (!hasHydrated || !enrollmentType) {
      return;
    }

    if (initializedFormRef.current) {
      return;
    }

    reset(
      enrollmentType === "group"
        ? {
            enrollmentType,
            applicant,
            group,
          }
        : {
            enrollmentType,
            applicant,
          },
    );
    initializedFormRef.current = true;
  }, [applicant, enrollmentType, group, hasHydrated, reset]);

  return {
    ...form,
    watchedApplicant,
    watchedGroup,
  };
}
