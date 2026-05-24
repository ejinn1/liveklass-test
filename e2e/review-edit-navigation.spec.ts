import { expect, test } from "@playwright/test";

import { goToPersonalReviewPage } from "./helpers/enrollment";

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
