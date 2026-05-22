import type { Course } from "@/types/course";

export function formatPrice(price: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDateRange(startDate: string, endDate: string) {
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  return `${formatter.format(new Date(startDate))} - ${formatter.format(
    new Date(endDate),
  )}`;
}

export function getRemainingSeats(course: Course) {
  return Math.max(course.maxCapacity - course.currentEnrollment, 0);
}

export function getCourseStatus(course: Course) {
  const remainingSeats = getRemainingSeats(course);

  if (remainingSeats === 0) {
    return {
      label: "정원 마감",
      tone: "closed",
      selectable: false,
    } as const;
  }

  if (remainingSeats <= 3) {
    return {
      label: `마감 임박 ${remainingSeats}석`,
      tone: "limited",
      selectable: true,
    } as const;
  }

  return {
    label: `${remainingSeats}석 남음`,
    tone: "available",
    selectable: true,
  } as const;
}
