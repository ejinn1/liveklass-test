import { expect, test } from "@playwright/test";

import { selectCourse } from "./helpers/course";

test("새로고침 후 수강생 입력 데이터가 복구된다", async ({ page }) => {
  await page.goto("/");

  await selectCourse(page, "Next.js 실전 앱 라우터");
  await page.getByRole("button", { name: "개인 신청" }).click();
  await page.getByRole("button", { name: "다음 단계" }).click();

  await expect(
    page.getByRole("heading", { name: "수강생 정보를 입력하세요" }),
  ).toBeVisible();

  await page.locator('input[name="applicant.name"]').fill("유지수");
  await page
    .locator('input[name="applicant.email"]')
    .fill("persist@example.com");
  await page.locator('input[name="applicant.phone"]').fill("01099998888");
  await page
    .locator('textarea[name="applicant.motivation"]')
    .fill("새로고침 후에도 입력값이 유지되는지 확인합니다.");

  await page.waitForFunction(() =>
    window.localStorage
      .getItem("liveklass-enrollment-form")
      ?.includes("새로고침 후에도 입력값이 유지되는지 확인합니다."),
  );
  await Promise.all([
    page.waitForEvent("dialog").then((dialog) => dialog.accept()),
    page.reload({ waitUntil: "domcontentloaded" }),
  ]);

  await expect(
    page.getByRole("heading", { name: "수강생 정보를 입력하세요" }),
  ).toBeVisible({ timeout: 10000 });
  await expect(page.locator('input[name="applicant.name"]')).toHaveValue(
    "유지수",
  );
  await expect(page.locator('input[name="applicant.email"]')).toHaveValue(
    "persist@example.com",
  );
  await expect(page.locator('input[name="applicant.phone"]')).toHaveValue(
    "010-9999-8888",
  );
  await expect(
    page.locator('textarea[name="applicant.motivation"]'),
  ).toHaveValue("새로고침 후에도 입력값이 유지되는지 확인합니다.");
});
