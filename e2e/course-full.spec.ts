import { expect, test } from "@playwright/test";

import { selectCourse } from "./helpers/course";

test("잔여 좌석보다 신청 인원이 많으면 제출 실패 안내를 보여준다", async ({
  page,
}) => {
  await page.goto("/");

  await selectCourse(page, "TypeScript 안정성 설계");
  await page.getByRole("button", { name: "단체 신청" }).click();
  await page.getByRole("button", { name: "다음 단계" }).click();

  await expect(
    page.getByRole("heading", { name: "수강생 정보를 입력하세요" }),
  ).toBeVisible();

  await page.locator('input[name="applicant.name"]').fill("정하늘");
  await page
    .locator('input[name="applicant.email"]')
    .fill("full-course@example.com");
  await page.locator('input[name="applicant.phone"]').fill("01022223333");
  await page
    .locator('input[name="group.organizationName"]')
    .fill("좌석 초과 테스트 팀");
  await page.locator('input[name="group.headCount"]').fill("3");
  await page
    .locator('input[name="group.participants.0.name"]')
    .fill("참가자일");
  await page
    .locator('input[name="group.participants.0.email"]')
    .fill("full-member-1@example.com");
  await page
    .locator('input[name="group.participants.1.name"]')
    .fill("참가자이");
  await page
    .locator('input[name="group.participants.1.email"]')
    .fill("full-member-2@example.com");
  await page
    .locator('input[name="group.participants.2.name"]')
    .fill("참가자삼");
  await page
    .locator('input[name="group.participants.2.email"]')
    .fill("full-member-3@example.com");
  await page.locator('input[name="group.contactPerson"]').fill("01033334444");
  await page.getByRole("button", { name: "다음 단계" }).click();

  await expect(
    page.getByRole("heading", { name: "신청 내용을 확인하세요" }),
  ).toBeVisible();
  await expect(page.getByText("TypeScript 안정성 설계")).toBeVisible();
  await expect(page.getByText("3명")).toBeVisible();

  await page
    .getByLabel(
      "수강 신청 정보가 정확하며, 이용약관과 개인정보 처리방침에 동의합니다.",
    )
    .check();
  await page.getByRole("button", { name: "제출하기" }).click();

  await expect(
    page.getByText(
      "선택한 강의의 잔여 좌석이 부족합니다. 신청 인원을 줄이거나 다른 강의를 선택해 주세요.",
    ),
  ).toBeVisible();
  await expect(
    page.getByText("현재 신청 가능한 잔여 좌석은 2명입니다."),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "다시 시도" })).toBeVisible();
});
