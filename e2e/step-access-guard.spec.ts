import { expect, test } from "@playwright/test";

test("강의 선택 없이 수강생 정보 페이지에 접근하면 첫 페이지로 이동한다", async ({
  page,
}) => {
  await page.goto("/applicant");

  await expect(page).toHaveURL("/");
  await expect(
    page.getByRole("heading", { name: "수강할 강의를 선택하세요" }),
  ).toBeVisible();
});

test("신청 정보 없이 신청 확인 페이지에 접근하면 첫 페이지로 이동한다", async ({
  page,
}) => {
  await page.goto("/review");

  await expect(page).toHaveURL("/");
  await expect(
    page.getByRole("heading", { name: "수강할 강의를 선택하세요" }),
  ).toBeVisible();
});
