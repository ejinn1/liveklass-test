import type { EnrollmentType } from "@/types/enrollment";

export const enrollmentTypes = ["personal", "group"] as const;

export const enrollmentTypeLabels: Record<EnrollmentType, string> = {
  personal: "개인 신청",
  group: "단체 신청",
};
