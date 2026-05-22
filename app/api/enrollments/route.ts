import { mockCourses } from "@/app/mocks/courses/data";
import type { EnrollmentErrorResponse } from "@/app/utils/enrollmentSubmit";

type EnrollmentRequest = {
  courseId?: string;
  type?: "personal" | "group";
  applicant?: {
    name?: string;
    email?: string;
    phone?: string;
    motivation?: string;
  };
  group?: {
    organizationName?: string;
    headCount?: number;
    participants?: Array<{ name?: string; email?: string }>;
    contactPerson?: string;
  };
  agreedToTerms?: boolean;
};

function createErrorResponse(
  code: EnrollmentErrorResponse["code"],
  message: string,
  status: number,
  details?: Record<string, string>,
) {
  return Response.json(
    {
      code,
      message,
      details,
    },
    {
      status,
    },
  );
}

function getRequestedSeatCount(body: EnrollmentRequest) {
  if (body.type === "group") {
    return body.group?.headCount ?? 0;
  }

  return 1;
}

export async function POST(request: Request) {
  const body = (await request.json()) as EnrollmentRequest;
  const course = mockCourses.find(
    (mockCourse) => mockCourse.id === body.courseId,
  );

  if (!course) {
    return createErrorResponse(
      "INVALID_INPUT",
      "강의 정보를 확인해 주세요.",
      400,
      {
        courseId: "존재하지 않는 강의입니다.",
      },
    );
  }

  if (!body.agreedToTerms) {
    return createErrorResponse(
      "INVALID_INPUT",
      "이용약관에 동의해 주세요.",
      400,
      {
        agreedToTerms: "이용약관 동의가 필요합니다.",
      },
    );
  }

  if (
    !body.type ||
    !body.applicant?.name ||
    !body.applicant.email ||
    !body.applicant.phone
  ) {
    return createErrorResponse("INVALID_INPUT", "입력값을 확인해 주세요.", 400);
  }

  if (body.type === "group" && !body.group) {
    return createErrorResponse(
      "INVALID_INPUT",
      "단체 신청 정보를 입력해 주세요.",
      400,
    );
  }

  const remainingSeats = course.maxCapacity - course.currentEnrollment;
  const requestedSeatCount = getRequestedSeatCount(body);

  if (remainingSeats < requestedSeatCount) {
    return createErrorResponse(
      "COURSE_FULL",
      "잔여 좌석보다 신청 인원이 많습니다.",
      409,
      {
        headCount: `현재 신청 가능한 잔여 좌석은 ${remainingSeats}명입니다.`,
      },
    );
  }

  return Response.json({
    enrollmentId: `ENR-${Date.now()}`,
    status: "confirmed",
    enrolledAt: new Date().toISOString(),
  });
}
