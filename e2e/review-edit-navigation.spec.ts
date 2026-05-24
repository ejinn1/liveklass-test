import { expect, test, type Page } from "@playwright/test";

import { selectCourse } from "./helpers/course";

async function goToPersonalReviewPage(page: Page) {
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

test("확인 페이지에서 강의 정보를 수정하면 강의 선택 페이지로 이동한다", async ({
  page,
}) => {
  await goToPersonalReviewPage(page);

  await page.getByRole("button", { name: "강의 정보 수정" }).click();

  await expect(
    page.getByRole("heading", { name: "수강할 강의를 선택하세요" }),
  ).toBeVisible();
});

test("확인 페이지에서 수강생 정보를 수정하면 수강생 정보 페이지로 이동한다", async ({
  page,
}) => {
  await goToPersonalReviewPage(page);

  await page.getByRole("button", { name: "수강생 정보 수정" }).click();

  await expect(
    page.getByRole("heading", { name: "수강생 정보를 입력하세요" }),
  ).toBeVisible();
});
