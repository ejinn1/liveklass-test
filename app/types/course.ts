export const courseCategories = [
  "development",
  "design",
  "marketing",
  "business",
] as const;

export type CourseCategory = (typeof courseCategories)[number];

export type Course = {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  price: number;
  maxCapacity: number;
  currentEnrollment: number;
  startDate: string;
  endDate: string;
  instructor: string;
};

export type CourseListResponse = {
  courses: Course[];
  categories: CourseCategory[];
};
