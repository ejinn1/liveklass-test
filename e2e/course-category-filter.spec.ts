import { expect, test } from "@playwright/test";

test("카테고리 선택에 따라 강의 목록을 필터링하고 전체 목록으로 복구한다", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("button", { name: "Next.js 실전 앱 라우터 강의 선택" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "디자인", exact: true }).click();

  await expect(
    page.getByRole("button", { name: "프로덕트 UI 디자인 입문 강의 선택" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "디자인 시스템 운영 강의 선택" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Next.js 실전 앱 라우터 강의 선택" }),
  ).toHaveCount(0);

  await page.getByRole("button", { name: "전체", exact: true }).click();

  await expect(
    page.getByRole("button", { name: "Next.js 실전 앱 라우터 강의 선택" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "비즈니스 전략 워크숍 강의 선택" }),
  ).toBeVisible();
});
