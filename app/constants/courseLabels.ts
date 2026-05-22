import { CourseCategory, EnrollmentType } from "@/app/types/courses";

export const categoryLabels: Record<CourseCategory, string> = {
  development: "개발",
  design: "디자인",
  marketing: "마케팅",
  business: "비즈니스",
};

export const enrollmentTypeLabels: Record<EnrollmentType, string> = {
  personal: "개인 신청",
  group: "단체 신청",
};
