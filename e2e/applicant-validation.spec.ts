import { expect, test } from "@playwright/test";

import { selectCourse } from "./helpers/course";

test("수강생 필수 정보를 입력하지 않으면 에러를 보여준다", async ({ page }) => {
  await page.goto("/");

  await selectCourse(page, "Next.js 실전 앱 라우터");
  await page.getByRole("button", { name: "개인 신청" }).click();
  await page.getByRole("button", { name: "다음 단계" }).click();

  await expect(
    page.getByRole("heading", { name: "수강생 정보를 입력하세요" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "다음 단계" }).click();

  await expect(page.getByText("이름은 2자 이상 입력해 주세요.")).toBeVisible();
  await expect(page.getByText("이메일을 입력해 주세요.")).toBeVisible();
  await expect(page.getByText("전화번호를 입력해 주세요.")).toBeVisible();
  await expect(page.locator('input[name="applicant.name"]')).toHaveClass(
    /border-red-400/,
  );
  await expect(page.locator('input[name="applicant.email"]')).toHaveClass(
    /border-red-400/,
  );
  await expect(page.locator('input[name="applicant.phone"]')).toHaveClass(
    /border-red-400/,
  );
});

test("단체 신청 참가자 이메일이 중복되면 에러를 보여준다", async ({ page }) => {
  await page.goto("/");

  await selectCourse(page, "Next.js 실전 앱 라우터");
  await page.getByRole("button", { name: "단체 신청" }).click();
  await page.getByRole("button", { name: "다음 단계" }).click();

  await expect(
    page.getByRole("heading", { name: "수강생 정보를 입력하세요" }),
  ).toBeVisible();

  await page.locator('input[name="applicant.name"]').fill("김민수");
  await page
    .locator('input[name="applicant.email"]')
    .fill("group-validation@example.com");
  await page.locator('input[name="applicant.phone"]').fill("01055556666");
  await page
    .locator('input[name="group.organizationName"]')
    .fill("검증 테스트 팀");
  await page.locator('input[name="group.participants.0.name"]').fill("이서연");
  await page
    .locator('input[name="group.participants.0.email"]')
    .fill("duplicate-member@example.com");
  await page.locator('input[name="group.participants.1.name"]').fill("박지훈");
  await page
    .locator('input[name="group.participants.1.email"]')
    .fill("duplicate-member@example.com");
  await page.locator('input[name="group.contactPerson"]').fill("01077778888");
  await page.getByRole("button", { name: "다음 단계" }).click();

  await expect(
    page.getByText("참가자 이메일은 중복될 수 없습니다.").first(),
  ).toBeVisible();
  await expect(
    page.locator('input[name="group.participants.0.email"]'),
  ).toHaveClass(/border-red-400/);
  await expect(
    page.locator('input[name="group.participants.1.email"]'),
  ).toHaveClass(/border-red-400/);
});
