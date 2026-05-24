import { expect, test } from "@playwright/test";

import { selectCourse } from "./helpers/course";

test("단체 신청 수강 신청을 완료한다", async ({ page }) => {
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
    .fill("group-lead@example.com");
  await page.locator('input[name="applicant.phone"]').fill("01098765432");
  await page
    .getByPlaceholder("수강 목적이나 기대하는 점을 입력해 주세요.")
    .fill("팀원들과 함께 실무 적용 역량을 높이기 위해 신청합니다.");

  await page
    .locator('input[name="group.organizationName"]')
    .fill("라이브클래스 팀");
  await page.locator('input[name="group.participants.0.name"]').fill("이서연");
  await page
    .locator('input[name="group.participants.0.email"]')
    .fill("member-1@example.com");
  await page.locator('input[name="group.participants.1.name"]').fill("박지훈");
  await page
    .locator('input[name="group.participants.1.email"]')
    .fill("member-2@example.com");
  await page.locator('input[name="group.contactPerson"]').fill("01011112222");
  await page.getByRole("button", { name: "다음 단계" }).click();

  await expect(
    page.getByRole("heading", { name: "신청 내용을 확인하세요" }),
  ).toBeVisible();
  await expect(page.getByText("단체 신청", { exact: true })).toBeVisible();
  await expect(page.getByText("라이브클래스 팀")).toBeVisible();
  await expect(page.getByText("2명")).toBeVisible();
  await expect(page.getByText("이서연")).toBeVisible();
  await expect(page.getByText("member-1@example.com")).toBeVisible();
  await expect(page.getByText("010-1111-2222")).toBeVisible();

  await page
    .getByLabel(
      "수강 신청 정보가 정확하며, 이용약관과 개인정보 처리방침에 동의합니다.",
    )
    .check();
  await page.getByRole("button", { name: "제출하기" }).click();

  await expect(
    page.getByRole("heading", { name: "수강 신청이 완료되었습니다" }),
  ).toBeVisible();
  await expect(page.getByText(/ENR-/)).toBeVisible();
  await expect(page.getByText("신청 확정")).toBeVisible();
  await expect(page.getByText("Next.js 실전 앱 라우터")).toBeVisible();
});
