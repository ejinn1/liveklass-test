import { expect, test } from "@playwright/test";

import { goToPersonalReviewPage } from "./helpers/enrollment";

test("수강 신청 완료 후 홈으로 돌아가면 강의 선택 페이지로 이동한다", async ({
  page,
}) => {
  await goToPersonalReviewPage(page);

  await page
    .getByLabel(
      "수강 신청 정보가 정확하며, 이용약관과 개인정보 처리방침에 동의합니다.",
    )
    .check();
  await page.getByRole("button", { name: "제출하기" }).click();

  await expect(
    page.getByRole("heading", { name: "수강 신청이 완료되었습니다" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "홈으로 돌아가기" }).click();

  await expect(
    page.getByRole("heading", { name: "수강할 강의를 선택하세요" }),
  ).toBeVisible();
});
