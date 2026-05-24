import { expect, type Page } from "@playwright/test";

export async function selectCourse(page: Page, courseTitle: string) {
  const courseCard = page.getByRole("button", {
    name: `${courseTitle} 강의 선택`,
  });

  await expect(courseCard).toBeVisible();
  await courseCard.click();
}
