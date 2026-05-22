import type {
  ApplicantInput,
  EnrollmentType,
  GroupInput,
} from "@/types/enrollment";

type CreateEnrollmentPayloadParams = {
  agreedToTerms: boolean;
  applicant: ApplicantInput;
  courseId: string;
  enrollmentType: EnrollmentType;
  group: GroupInput;
};

export type EnrollmentPayload =
  | {
      courseId: string;
      type: "personal";
      applicant: ApplicantInput;
      agreedToTerms: boolean;
    }
  | {
      courseId: string;
      type: "group";
      applicant: ApplicantInput;
      group: GroupInput;
      agreedToTerms: boolean;
    };

export type EnrollmentResponse = {
  enrollmentId: string;
  status: "confirmed" | "pending";
  enrolledAt: string;
};

export type EnrollmentErrorResponse = {
  code: "COURSE_FULL" | "DUPLICATE_ENROLLMENT" | "INVALID_INPUT";
  message: string;
  details?: Record<string, string>;
};

export function isEnrollmentErrorResponse(
  value: unknown,
): value is EnrollmentErrorResponse {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "code" in value && "message" in value;
}

export function createEnrollmentSubmitError(
  value: unknown,
): EnrollmentErrorResponse {
  if (isEnrollmentErrorResponse(value)) {
    return value;
  }

  return {
    code: "INVALID_INPUT",
    message: "수강 신청 제출에 실패했습니다. 다시 시도해 주세요.",
  };
}

export function createEnrollmentPayload({
  agreedToTerms,
  applicant,
  courseId,
  enrollmentType,
  group,
}: CreateEnrollmentPayloadParams): EnrollmentPayload {
  if (enrollmentType === "personal") {
    return {
      courseId,
      type: "personal",
      applicant,
      agreedToTerms,
    };
  }

  return {
    courseId,
    type: "group",
    applicant,
    group,
    agreedToTerms,
  };
}
