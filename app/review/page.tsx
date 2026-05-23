"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useEffect, useState } from "react";

import { EnrollmentStepActions } from "@/components/enrollment/EnrollmentStepActions";
import { EnrollmentStepHeader } from "@/components/enrollment/EnrollmentStepHeader";
import { enrollmentTypeLabels } from "@/constants/enrollment";
import { useEnrollmentNavigationGuard } from "@/hooks/useEnrollmentNavigationGuard";
import { mockCourses } from "@/mocks/courses/data";
import { createEnrollmentMutationOptions } from "@/remotes/enrollments/mutation";
import { useEnrollmentFormStore } from "@/stores/enrollmentFormStore";
import { useEnrollmentStepStore } from "@/stores/enrollmentStepStore";
import { formatDateRange, formatPrice } from "@/utils/course";
import {
  createEnrollmentPayload,
  createEnrollmentSubmitError,
  type EnrollmentResponse,
} from "@/utils/enrollmentSubmit";

type SubmittedEnrollment = {
  courseTitle: string;
  result: EnrollmentResponse;
};

export default function ReviewPage() {
  const router = useRouter();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submittedEnrollment, setSubmittedEnrollment] =
    useState<SubmittedEnrollment | null>(null);
  const { currentStep, goToStep } = useEnrollmentStepStore();
  const {
    applicant,
    enrollmentType,
    group,
    resetEnrollmentForm,
    selectedCourseId,
  } = useEnrollmentFormStore();
  const selectedCourse =
    mockCourses.find((course) => course.id === selectedCourseId) ?? null;
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
  useEnrollmentNavigationGuard({
    enabled: !submittedEnrollment,
  });

  useEffect(() => {
    goToStep(3);
  }, [goToStep]);

  useEffect(() => {
    if (submittedEnrollment) {
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
    router,
    selectedCourseId,
    submittedEnrollment,
  ]);

  if (submittedEnrollment) {
    return (
      <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-8 sm:px-8 lg:px-10">
        <div className="rounded-lg border border-zinc-200 bg-white p-8">
          <p className="text-sm font-semibold text-emerald-700">신청 완료</p>
          <h1 className="mt-2 text-3xl font-bold text-zinc-950">
            수강 신청이 완료되었습니다
          </h1>
          <dl className="mt-6 grid gap-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">신청 번호</dt>
              <dd className="font-semibold text-zinc-950">
                {submittedEnrollment.result.enrollmentId}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">상태</dt>
              <dd className="font-semibold text-zinc-950">
                {submittedEnrollment.result.status}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">신청 강의</dt>
              <dd className="text-right font-semibold text-zinc-950">
                {submittedEnrollment.courseTitle}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    );
  }

  if (!selectedCourse || !enrollmentType) {
    return null;
  }

  const handleSubmit = () => {
    if (!agreedToTerms || isSubmitting) {
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
  const handleCourseEditClick = () => {
    router.push("/");
  };
  const handleApplicantEditClick = () => {
    router.push("/applicant");
  };
  const handlePreviousClick = () => {
    router.push("/applicant");
  };
  const handleTermsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAgreedToTerms(event.target.checked);
  };

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-8 sm:px-8 lg:px-10">
      <EnrollmentStepHeader
        currentStep={currentStep}
        title="신청 내용을 확인하세요"
        description="제출 전 강의와 신청 정보를 확인하고 필요한 경우 이전 단계에서 수정할 수 있습니다."
      />

      <div className="space-y-5">
        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-base font-semibold text-zinc-950">강의 정보</h2>
            <button
              type="button"
              onClick={handleCourseEditClick}
              className="text-sm font-semibold text-zinc-700 underline-offset-4 hover:underline"
            >
              수정
            </button>
          </div>

          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">강의명</dt>
              <dd className="text-right font-medium text-zinc-950">
                {selectedCourse.title}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">일정</dt>
              <dd className="text-right font-medium text-zinc-950">
                {formatDateRange(
                  selectedCourse.startDate,
                  selectedCourse.endDate,
                )}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">가격</dt>
              <dd className="font-semibold text-zinc-950">
                {formatPrice(selectedCourse.price)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">신청 유형</dt>
              <dd className="font-medium text-zinc-950">
                {enrollmentTypeLabels[enrollmentType]}
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-base font-semibold text-zinc-950">
              수강생 정보
            </h2>
            <button
              type="button"
              onClick={handleApplicantEditClick}
              className="text-sm font-semibold text-zinc-700 underline-offset-4 hover:underline"
            >
              수정
            </button>
          </div>

          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">이름</dt>
              <dd className="font-medium text-zinc-950">{applicant.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">이메일</dt>
              <dd className="font-medium text-zinc-950">{applicant.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">전화번호</dt>
              <dd className="font-medium text-zinc-950">{applicant.phone}</dd>
            </div>
            {applicant.motivation ? (
              <div className="grid gap-1">
                <dt className="text-zinc-500">수강 동기</dt>
                <dd className="leading-6 text-zinc-950">
                  {applicant.motivation}
                </dd>
              </div>
            ) : null}
          </dl>
        </section>

        {enrollmentType === "group" ? (
          <section className="rounded-lg border border-zinc-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-base font-semibold text-zinc-950">
                단체 신청 정보
              </h2>
              <button
                type="button"
                onClick={handleApplicantEditClick}
                className="text-sm font-semibold text-zinc-700 underline-offset-4 hover:underline"
              >
                수정
              </button>
            </div>

            <dl className="mt-4 grid gap-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">단체명</dt>
                <dd className="font-medium text-zinc-950">
                  {group.organizationName}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">신청 인원수</dt>
                <dd className="font-medium text-zinc-950">
                  {group.headCount}명
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">담당자 연락처</dt>
                <dd className="font-medium text-zinc-950">
                  {group.contactPerson}
                </dd>
              </div>
            </dl>

            <div className="mt-5 space-y-2">
              <p className="text-sm font-semibold text-zinc-900">참가자 명단</p>
              <div className="grid gap-2">
                {group.participants.map((participant, index) => (
                  <div
                    key={`${participant.email}-${index}`}
                    className="flex justify-between gap-4 rounded-md bg-zinc-50 px-3 py-2 text-sm"
                  >
                    <span className="font-medium text-zinc-950">
                      {participant.name}
                    </span>
                    <span className="text-zinc-600">{participant.email}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </div>

      <label className="mt-6 flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-5 text-sm text-zinc-700">
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={handleTermsChange}
          className="mt-1 size-4 rounded border-zinc-300"
        />
        <span>
          수강 신청 정보가 정확하며, 이용약관과 개인정보 처리방침에 동의합니다.
        </span>
      </label>

      {submitError ? (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-700">
            {submitError.message}
          </p>
          {submitError.details ? (
            <ul className="mt-2 grid gap-1 text-sm text-red-700">
              {Object.entries(submitError.details).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          ) : null}
          <button
            type="button"
            onClick={handleRetryClick}
            disabled={!agreedToTerms || isSubmitting}
            className="mt-3 h-10 rounded-md border border-red-300 bg-white px-4 text-sm font-semibold text-red-700 transition hover:border-red-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "재시도 중" : "다시 시도"}
          </button>
        </div>
      ) : null}

      <EnrollmentStepActions
        nextDisabled={!agreedToTerms || isSubmitting}
        nextLabel={isSubmitting ? "제출 중" : "제출하기"}
        onNext={handleSubmit}
        onPrevious={handlePreviousClick}
      />
    </section>
  );
}
