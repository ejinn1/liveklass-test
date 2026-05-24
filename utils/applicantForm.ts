import type { FieldErrors } from "react-hook-form";

import type { ApplicantStepFormValues } from "@/schemas/enrollment";

export function getFirstApplicantStepErrorName(
  errors: FieldErrors<ApplicantStepFormValues>,
) {
  if (errors.applicant?.name) {
    return "applicant.name";
  }

  if (errors.applicant?.email) {
    return "applicant.email";
  }

  if (errors.applicant?.phone) {
    return "applicant.phone";
  }

  if (errors.applicant?.motivation) {
    return "applicant.motivation";
  }

  if ("group" in errors && errors.group?.organizationName) {
    return "group.organizationName";
  }

  if ("group" in errors && errors.group?.headCount) {
    return "group.headCount";
  }

  if ("group" in errors && Array.isArray(errors.group?.participants)) {
    const participantErrorIndex = errors.group.participants.findIndex(Boolean);

    if (participantErrorIndex >= 0) {
      const participantError = errors.group.participants[participantErrorIndex];

      if (participantError?.name) {
        return `group.participants.${participantErrorIndex}.name`;
      }

      if (participantError?.email) {
        return `group.participants.${participantErrorIndex}.email`;
      }
    }

    return "group.participants.0.name";
  }

  if ("group" in errors && errors.group?.contactPerson) {
    return "group.contactPerson";
  }

  return null;
}

export function scrollFieldIntoView(fieldName: string) {
  const field = document.querySelector<HTMLElement>(`[name="${fieldName}"]`);

  if (!field) {
    return;
  }

  field?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
  field.focus({
    preventScroll: true,
  });
}
