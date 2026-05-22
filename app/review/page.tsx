"use client";

import { type ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { EnrollmentResponse } from "@/app/utils/enrollmentSubmit";
import { useEnrollmentFormStore } from "@/app/stores/enrollmentFormStore";
import { useEnrollmentStepStore } from "@/app/stores/enrollmentStepStore";
import { formatDateRange, formatPrice } from "@/app/utils/course";
import { createEnrollmentPayload } from "@/app/utils/enrollmentSubmit";
import { mockCourses } from "@/app/mocks/courses/data";
import { enrollmentTypeLabels } from "@/app/constants/enrollment";
import { StepIndicator } from "@/components/enrollment/StepIndicator";

export default function ReviewPage() {
  const router = useRouter();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitResult, setSubmitResult] = useState<EnrollmentResponse | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentStep, goToStep } = useEnrollmentStepStore();
  const { applicant, enrollmentType, group, selectedCourseId } =
    useEnrollmentFormStore();
  const selectedCourse =
    mockCourses.find((course) => course.id === selectedCourseId) ?? null;

  useEffect(() => {
    goToStep(3);
  }, [goToStep]);

  useEffect(() => {
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
  ]);

  if (!selectedCourse || !enrollmentType) {
    return null;
  }

  const handleSubmit = async () => {
    if (!agreedToTerms || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const response = await fetch("/api/enrollments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        createEnrollmentPayload({
          agreedToTerms,
          applicant,
          courseId: selectedCourse.id,
          enrollmentType,
          group,
        }),
      ),
    });

    const data = await response.json();

    if (!response.ok) {
      setSubmitError(data.message ?? "수강 신청 제출에 실패했습니다.");
      setIsSubmitting(false);
      return;
    }

    setSubmitResult(data as EnrollmentResponse);
    setIsSubmitting(false);
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

  if (submitResult) {
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
                {submitResult.enrollmentId}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">상태</dt>
              <dd className="font-semibold text-zinc-950">
                {submitResult.status}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">신청 강의</dt>
              <dd className="text-right font-semibold text-zinc-950">
                {selectedCourse.title}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-8 sm:px-8 lg:px-10">
      <div className="mb-8 flex flex-col gap-4 border-b border-zinc-200 pb-6">
        <div>
          <p className="text-sm font-semibold text-zinc-500">Step 3</p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal text-zinc-950">
            신청 내용을 확인하세요
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
            제출 전 강의와 신청 정보를 확인하고 필요한 경우 이전 단계에서 수정할
            수 있습니다.
          </p>
        </div>

        <StepIndicator currentStep={currentStep} />
      </div>

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
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {submitError}
        </div>
      ) : null}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={handlePreviousClick}
          className="h-12 rounded-md border border-zinc-300 px-5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-500"
        >
          이전 단계
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className={
            agreedToTerms && !isSubmitting
              ? "h-12 rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800"
              : "h-12 cursor-not-allowed rounded-md bg-zinc-200 px-5 text-sm font-semibold text-zinc-500"
          }
          disabled={!agreedToTerms || isSubmitting}
        >
          {isSubmitting ? "제출 중" : "제출하기"}
        </button>
      </div>
    </section>
  );
}
