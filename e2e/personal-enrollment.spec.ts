import { expect, test } from "@playwright/test";

test("개인 신청 수강 신청을 완료한다", async ({ page }) => {
  const courseListResponse = page.waitForResponse(
    (response) =>
      response.url().includes("/api/courses") && response.status() === 200,
  );

  await page.goto("/");
  await courseListResponse;

  await page
    .getByRole("button", { name: "Next.js 실전 앱 라우터 강의 선택" })
    .click();
  await page.getByRole("button", { name: "개인 신청" }).click();
  await page.getByRole("button", { name: "다음 단계" }).click();

  await expect(
    page.getByRole("heading", { name: "수강생 정보를 입력하세요" }),
  ).toBeVisible();

  await page.getByPlaceholder("홍길동").fill("홍길동");
  await page
    .getByPlaceholder("student@example.com")
    .fill("student@example.com");
  await page.getByPlaceholder("010-1234-5678").fill("01012341234");
  await page
    .getByPlaceholder("수강 목적이나 기대하는 점을 입력해 주세요.")
    .fill("실무 프로젝트에 Next.js를 적용하기 위해 신청합니다.");
  await page.getByRole("button", { name: "다음 단계" }).click();

  await expect(
    page.getByRole("heading", { name: "신청 내용을 확인하세요" }),
  ).toBeVisible();
  await expect(page.getByText("Next.js 실전 앱 라우터")).toBeVisible();
  await expect(page.getByText("홍길동")).toBeVisible();
  await expect(page.getByText("student@example.com")).toBeVisible();
  await expect(page.getByText("010-1234-1234")).toBeVisible();

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
