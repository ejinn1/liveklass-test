import { expect, test } from "@playwright/test";

import { goToPersonalReviewPage } from "./helpers/enrollment";

test("약관 동의 전에는 제출할 수 없고 동의 후 제출 버튼이 활성화된다", async ({
  page,
}) => {
  await goToPersonalReviewPage(page);

  const submitButton = page.getByRole("button", { name: "제출하기" });
  const agreementCheckbox = page.getByLabel(
    "수강 신청 정보가 정확하며, 이용약관과 개인정보 처리방침에 동의합니다.",
  );

  await expect(submitButton).toBeDisabled();

  await agreementCheckbox.check();

  await expect(submitButton).toBeEnabled();
});
