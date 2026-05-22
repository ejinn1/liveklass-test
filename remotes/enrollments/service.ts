import type {
  EnrollmentPayload,
  EnrollmentResponse,
} from "@/utils/enrollmentSubmit";
import { createEnrollmentSubmitError } from "@/utils/enrollmentSubmit";

export async function createEnrollment(
  payload: EnrollmentPayload,
): Promise<EnrollmentResponse> {
  const response = await fetch("/api/enrollments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw createEnrollmentSubmitError(data);
  }

  return data as EnrollmentResponse;
}
