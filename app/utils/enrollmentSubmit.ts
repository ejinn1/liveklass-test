import type {
  ApplicantInput,
  EnrollmentType,
  GroupInput,
} from "@/app/types/enrollment";

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
  code: string;
  message: string;
  details?: Record<string, string>;
};

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
