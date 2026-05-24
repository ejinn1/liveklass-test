import { expect, type Page, test } from "@playwright/test";

import { selectCourse } from "./helpers/course";

async function submitPersonalEnrollment(page: Page) {
  await selectCourse(page, "Next.js 실전 앱 라우터");
  await page.getByRole("button", { name: "개인 신청" }).click();
  await page.getByRole("button", { name: "다음 단계" }).click();

  await expect(
    page.getByRole("heading", { name: "수강생 정보를 입력하세요" }),
  ).toBeVisible();

  await page.locator('input[name="applicant.name"]').fill("중복신청자");
  await page
    .locator('input[name="applicant.email"]')
    .fill("duplicate@example.com");
  await page.locator('input[name="applicant.phone"]').fill("01044445555");
  await page.getByRole("button", { name: "다음 단계" }).click();

  await expect(
    page.getByRole("heading", { name: "신청 내용을 확인하세요" }),
  ).toBeVisible();

  await page
    .getByLabel(
      "수강 신청 정보가 정확하며, 이용약관과 개인정보 처리방침에 동의합니다.",
    )
    .check();
  await page.getByRole("button", { name: "제출하기" }).click();
}

test("같은 강의와 이메일로 다시 신청하면 중복 신청 안내를 보여준다", async ({
  page,
}) => {
  await page.goto("/");

  await submitPersonalEnrollment(page);

  await expect(
    page.getByRole("heading", { name: "수강 신청이 완료되었습니다" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "홈으로 돌아가기" }).click();

  await expect(
    page.getByRole("heading", { name: "수강할 강의를 선택하세요" }),
  ).toBeVisible();

  await submitPersonalEnrollment(page);

  await expect(
    page.getByText(
      "이미 같은 이메일로 신청한 강의입니다. 신청 내역을 확인하거나 다른 강의를 선택해 주세요.",
    ),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "다시 시도" })).toBeVisible();
});
