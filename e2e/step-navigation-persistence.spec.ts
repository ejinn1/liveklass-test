import { expect, test } from "@playwright/test";

import { selectCourse } from "./helpers/course";

test("이전 단계로 돌아갔다가 다시 진입해도 수강생 입력 데이터가 유지된다", async ({
  page,
}) => {
  await page.goto("/");

  await selectCourse(page, "Next.js 실전 앱 라우터");
  await page.getByRole("button", { name: "개인 신청" }).click();
  await page.getByRole("button", { name: "다음 단계" }).click();

  await page.locator('input[name="applicant.name"]').fill("이전단계");
  await page
    .locator('input[name="applicant.email"]')
    .fill("previous-step@example.com");
  await page.locator('input[name="applicant.phone"]').fill("01055556666");
  await page
    .locator('textarea[name="applicant.motivation"]')
    .fill("이전 단계로 돌아가도 입력값이 유지되는지 확인합니다.");

  await page.getByRole("button", { name: "이전 단계" }).click();

  await expect(
    page.getByRole("heading", { name: "수강할 강의를 선택하세요" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "다음 단계" }).click();

  await expect(
    page.getByRole("heading", { name: "수강생 정보를 입력하세요" }),
  ).toBeVisible();
  await expect(page.locator('input[name="applicant.name"]')).toHaveValue(
    "이전단계",
  );
  await expect(page.locator('input[name="applicant.email"]')).toHaveValue(
    "previous-step@example.com",
  );
  await expect(page.locator('input[name="applicant.phone"]')).toHaveValue(
    "010-5555-6666",
  );
  await expect(
    page.locator('textarea[name="applicant.motivation"]'),
  ).toHaveValue("이전 단계로 돌아가도 입력값이 유지되는지 확인합니다.");
});
