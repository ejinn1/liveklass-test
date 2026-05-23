"use client";

import { type ChangeEvent, useState } from "react";

import { EnrollmentCompleteView } from "@/components/enrollment/EnrollmentCompleteView";
import { EnrollmentStepActions } from "@/components/enrollment/EnrollmentStepActions";
import { EnrollmentStepHeader } from "@/components/enrollment/EnrollmentStepHeader";
import { ReviewCourseSection } from "@/components/enrollment/ReviewCourseSection";
import { useEnrollmentNavigationGuard } from "@/hooks/useEnrollmentNavigationGuard";
import { useEnrollmentSubmit } from "@/hooks/useEnrollmentSubmit";
import { useReviewStepAccessGuard } from "@/hooks/useReviewStepAccessGuard";
import { useReviewStepNavigation } from "@/hooks/useReviewStepNavigation";
import { mockCourses } from "@/mocks/courses/data";
import { useEnrollmentFormStore } from "@/stores/enrollmentFormStore";

export default function ReviewPage() {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const {
    currentStep,
    handleApplicantEditClick,
    handleCourseEditClick,
    handlePreviousClick,
  } = useReviewStepNavigation();
  const { applicant, enrollmentType, group, hasHydrated, selectedCourseId } =
    useEnrollmentFormStore();
  const selectedCourse =
    mockCourses.find((course) => course.id === selectedCourseId) ?? null;
  const {
    handleRetryClick,
    handleSubmit,
    isSubmitting,
    submitError,
    submittedEnrollment,
  } = useEnrollmentSubmit({
    agreedToTerms,
    applicant,
    enrollmentType,
    group,
    selectedCourse,
  });
  useEnrollmentNavigationGuard({
    enabled: !submittedEnrollment,
  });
  useReviewStepAccessGuard({
    applicant,
    enrollmentType,
    hasHydrated,
    isSubmitted: Boolean(submittedEnrollment),
    selectedCourseId,
  });

  if (submittedEnrollment) {
    return <EnrollmentCompleteView submittedEnrollment={submittedEnrollment} />;
  }

  if (!selectedCourse || !enrollmentType) {
    return null;
  }

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
        <ReviewCourseSection
          enrollmentType={enrollmentType}
          onEdit={handleCourseEditClick}
          selectedCourse={selectedCourse}
        />

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
