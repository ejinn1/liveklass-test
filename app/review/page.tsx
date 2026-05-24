"use client";

import { useState } from "react";

import { Skeleton } from "@/components/common/Skeleton";
import { EnrollmentCompleteView } from "@/components/enrollment/EnrollmentCompleteView";
import { EnrollmentStepActions } from "@/components/enrollment/EnrollmentStepActions";
import { EnrollmentStepHeader } from "@/components/enrollment/EnrollmentStepHeader";
import { ReviewApplicantSection } from "@/components/enrollment/ReviewApplicantSection";
import { ReviewCourseSection } from "@/components/enrollment/ReviewCourseSection";
import { ReviewGroupSection } from "@/components/enrollment/ReviewGroupSection";
import { ReviewSubmitError } from "@/components/enrollment/ReviewSubmitError";
import { ReviewTermsAgreement } from "@/components/enrollment/ReviewTermsAgreement";
import { useEnrollmentNavigationGuard } from "@/hooks/useEnrollmentNavigationGuard";
import { useEnrollmentSubmit } from "@/hooks/useEnrollmentSubmit";
import { useReviewSelectedCourse } from "@/hooks/useReviewSelectedCourse";
import { useReviewStepAccessGuard } from "@/hooks/useReviewStepAccessGuard";
import { useReviewStepNavigation } from "@/hooks/useReviewStepNavigation";
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
  const { loading: isSelectedCourseLoading, selectedCourse } =
    useReviewSelectedCourse({
      selectedCourseId,
    });
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

  if (!enrollmentType) {
    return null;
  }

  const handleTermsChange = (nextAgreedToTerms: boolean) => {
    setAgreedToTerms(nextAgreedToTerms);
  };

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-8 sm:px-8 lg:px-10">
      <EnrollmentStepHeader
        currentStep={currentStep}
        title="신청 내용을 확인하세요"
        description="제출 전 강의와 신청 정보를 확인하고 필요한 경우 이전 단계에서 수정할 수 있습니다."
      />

      {isSelectedCourseLoading ? (
        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="mt-5 h-4 w-full" />
          <Skeleton className="mt-3 h-4 w-2/3" />
          <Skeleton className="mt-3 h-4 w-1/2" />
        </div>
      ) : null}

      {!isSelectedCourseLoading && selectedCourse ? (
        <>
          <div className="space-y-5">
            <ReviewCourseSection
              enrollmentType={enrollmentType}
              onEdit={handleCourseEditClick}
              selectedCourse={selectedCourse}
            />

            <ReviewApplicantSection
              applicant={applicant}
              onEdit={handleApplicantEditClick}
            />

            {enrollmentType === "group" ? (
              <ReviewGroupSection
                group={group}
                onEdit={handleApplicantEditClick}
              />
            ) : null}
          </div>

          <ReviewTermsAgreement
            agreedToTerms={agreedToTerms}
            onChange={handleTermsChange}
          />

          {submitError ? (
            <ReviewSubmitError
              disabled={!agreedToTerms || isSubmitting}
              isSubmitting={isSubmitting}
              onRetry={handleRetryClick}
              submitError={submitError}
            />
          ) : null}

          <EnrollmentStepActions
            nextDisabled={!agreedToTerms || isSubmitting}
            nextLabel={isSubmitting ? "제출 중" : "제출하기"}
            onNext={handleSubmit}
            onPrevious={handlePreviousClick}
          />
        </>
      ) : null}
    </section>
  );
}
