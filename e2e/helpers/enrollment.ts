import { expect, type Page } from "@playwright/test";

import { selectCourse } from "./course";

export async function goToPersonalReviewPage(page: Page) {
  await page.goto("/");

  await selectCourse(page, "Next.js 실전 앱 라우터");
  await page.getByRole("button", { name: "개인 신청" }).click();
  await page.getByRole("button", { name: "다음 단계" }).click();

  await page.getByPlaceholder("홍길동").fill("수정테스트");
  await page
    .getByPlaceholder("student@example.com")
    .fill("edit-test@example.com");
  await page.getByPlaceholder("010-1234-5678").fill("01012341234");
  await page.getByRole("button", { name: "다음 단계" }).click();

  await expect(
    page.getByRole("heading", { name: "신청 내용을 확인하세요" }),
  ).toBeVisible();
}
