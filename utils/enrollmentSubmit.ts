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

const enrollmentErrorMessages: Record<EnrollmentErrorResponse["code"], string> =
  {
    COURSE_FULL:
      "선택한 강의의 잔여 좌석이 부족합니다. 신청 인원을 줄이거나 다른 강의를 선택해 주세요.",
    DUPLICATE_ENROLLMENT:
      "이미 같은 이메일로 신청한 강의입니다. 신청 내역을 확인하거나 다른 강의를 선택해 주세요.",
    INVALID_INPUT:
      "입력한 신청 정보를 다시 확인해 주세요. 필요한 경우 이전 단계로 돌아가 수정할 수 있습니다.",
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
    return {
      ...value,
      message: enrollmentErrorMessages[value.code],
    };
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
