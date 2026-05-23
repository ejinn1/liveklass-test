"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { createEnrollmentMutationOptions } from "@/remotes/enrollments/mutation";
import { useEnrollmentFormStore } from "@/stores/enrollmentFormStore";
import type { Course } from "@/types/course";
import type {
  ApplicantInput,
  EnrollmentType,
  GroupInput,
} from "@/types/enrollment";
import {
  createEnrollmentPayload,
  createEnrollmentSubmitError,
  type EnrollmentResponse,
} from "@/utils/enrollmentSubmit";

export type SubmittedEnrollment = {
  courseTitle: string;
  result: EnrollmentResponse;
};

type UseEnrollmentSubmitParams = {
  agreedToTerms: boolean;
  applicant: ApplicantInput;
  enrollmentType: EnrollmentType | null;
  group: GroupInput;
  selectedCourse: Course | null;
};

export function useEnrollmentSubmit({
  agreedToTerms,
  applicant,
  enrollmentType,
  group,
  selectedCourse,
}: UseEnrollmentSubmitParams) {
  const [submittedEnrollment, setSubmittedEnrollment] =
    useState<SubmittedEnrollment | null>(null);
  const resetEnrollmentForm = useEnrollmentFormStore(
    (state) => state.resetEnrollmentForm,
  );

  const createEnrollmentMutation = useMutation({
    ...createEnrollmentMutationOptions(),
    onSuccess: (result) => {
      setSubmittedEnrollment({
        courseTitle: selectedCourse?.title ?? "",
        result,
      });
      resetEnrollmentForm();
      useEnrollmentFormStore.persist.clearStorage();
    },
  });

  const submitError = createEnrollmentMutation.error
    ? createEnrollmentSubmitError(createEnrollmentMutation.error)
    : null;
  const isSubmitting = createEnrollmentMutation.isPending;

  const handleSubmit = () => {
    if (!agreedToTerms || isSubmitting || !selectedCourse || !enrollmentType) {
      return;
    }

    createEnrollmentMutation.mutate(
      createEnrollmentPayload({
        agreedToTerms,
        applicant,
        courseId: selectedCourse.id,
        enrollmentType,
        group,
      }),
    );
  };

  const handleRetryClick = () => {
    handleSubmit();
  };

  return {
    handleRetryClick,
    handleSubmit,
    isSubmitting,
    submitError,
    submittedEnrollment,
  };
}
