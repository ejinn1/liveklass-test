import type { EnrollmentFormState } from "@/types/enrollment";

function hasText(value: string) {
  return value.trim().length > 0;
}

export function hasEnrollmentDraft({
  applicant,
  enrollmentType,
  group,
  selectedCourseId,
}: EnrollmentFormState) {
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

  return (
    Boolean(selectedCourseId) ||
    Boolean(enrollmentType) ||
    hasApplicantInput ||
    hasGroupInput
  );
}
