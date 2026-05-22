import { courseCategories, type Course } from "@/app/types/course";

export const mockCourses: Course[] = [
  {
    id: "course-dev-next",
    title: "Next.js 실전 앱 라우터",
    description:
      "App Router, Server Components, Route Handler를 활용해 실제 서비스 흐름을 구현합니다.",
    category: "development",
    price: 320000,
    maxCapacity: 30,
    currentEnrollment: 18,
    startDate: "2026-06-08T10:00:00+09:00",
    endDate: "2026-06-19T17:00:00+09:00",
    instructor: "김도현",
  },
  {
    id: "course-dev-typescript",
    title: "TypeScript 안정성 설계",
    description:
      "타입 모델링, discriminated union, API 타입 계약을 중심으로 안정적인 프론트엔드를 설계합니다.",
    category: "development",
    price: 280000,
    maxCapacity: 24,
    currentEnrollment: 22,
    startDate: "2026-06-15T19:00:00+09:00",
    endDate: "2026-06-26T21:30:00+09:00",
    instructor: "박서준",
  },
  {
    id: "course-design-product",
    title: "프로덕트 UI 디자인 입문",
    description:
      "사용자 여정, 정보 구조, 컴포넌트 일관성을 기반으로 업무형 UI를 설계합니다.",
    category: "design",
    price: 240000,
    maxCapacity: 20,
    currentEnrollment: 20,
    startDate: "2026-07-01T10:00:00+09:00",
    endDate: "2026-07-10T17:00:00+09:00",
    instructor: "이하린",
  },
  {
    id: "course-design-system",
    title: "디자인 시스템 운영",
    description:
      "토큰, 컴포넌트 문서화, 프론트엔드 협업 방식을 실무 사례로 익힙니다.",
    category: "design",
    price: 300000,
    maxCapacity: 18,
    currentEnrollment: 9,
    startDate: "2026-07-13T13:00:00+09:00",
    endDate: "2026-07-24T17:00:00+09:00",
    instructor: "정유진",
  },
  {
    id: "course-marketing-growth",
    title: "그로스 마케팅 핵심 지표",
    description:
      "퍼널, 리텐션, 실험 설계를 통해 마케팅 성과를 분석하고 개선합니다.",
    category: "marketing",
    price: 210000,
    maxCapacity: 28,
    currentEnrollment: 25,
    startDate: "2026-06-22T19:00:00+09:00",
    endDate: "2026-07-03T21:30:00+09:00",
    instructor: "최민재",
  },
  {
    id: "course-marketing-content",
    title: "콘텐츠 마케팅 운영",
    description:
      "브랜드 메시지, 콘텐츠 캘린더, 캠페인 회고까지 운영 흐름을 구성합니다.",
    category: "marketing",
    price: 190000,
    maxCapacity: 32,
    currentEnrollment: 11,
    startDate: "2026-07-06T14:00:00+09:00",
    endDate: "2026-07-17T17:00:00+09:00",
    instructor: "문소영",
  },
  {
    id: "course-business-strategy",
    title: "비즈니스 전략 워크숍",
    description:
      "시장 분석, 포지셔닝, 실행 로드맵을 팀 단위 실습으로 정리합니다.",
    category: "business",
    price: 360000,
    maxCapacity: 16,
    currentEnrollment: 16,
    startDate: "2026-06-29T10:00:00+09:00",
    endDate: "2026-07-03T18:00:00+09:00",
    instructor: "한지훈",
  },
  {
    id: "course-business-pm",
    title: "PM을 위한 의사결정 프레임",
    description:
      "문제 정의, 우선순위, 이해관계자 커뮤니케이션을 사례 중심으로 훈련합니다.",
    category: "business",
    price: 260000,

    maxCapacity: 22,
    currentEnrollment: 14,
    startDate: "2026-07-20T19:00:00+09:00",
    endDate: "2026-07-31T21:30:00+09:00",
    instructor: "오세연",
  },
];

export const mockCourseCategories = [...courseCategories];
