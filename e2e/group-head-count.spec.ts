import { expect, test } from "@playwright/test";

import { selectCourse } from "./helpers/course";

test("단체 신청 인원수 변경 시 참가자 입력 필드 개수가 동기화된다", async ({
  page,
}) => {
  await page.goto("/");

  await selectCourse(page, "Next.js 실전 앱 라우터");
  await page.getByRole("button", { name: "단체 신청" }).click();
  await page.getByRole("button", { name: "다음 단계" }).click();

  const headCountInput = page.locator('input[name="group.headCount"]');
  const participantNameInputs = page.locator(
    'input[name^="group.participants"][name$=".name"]',
  );
  const participantEmailInputs = page.locator(
    'input[name^="group.participants"][name$=".email"]',
  );

  await expect(participantNameInputs).toHaveCount(2);
  await expect(participantEmailInputs).toHaveCount(2);

  await headCountInput.fill("4");

  await expect(participantNameInputs).toHaveCount(4);
  await expect(participantEmailInputs).toHaveCount(4);
  await expect(
    page.locator('input[name="group.participants.3.name"]'),
  ).toBeVisible();
  await expect(
    page.locator('input[name="group.participants.3.email"]'),
  ).toBeVisible();

  await headCountInput.fill("3");

  await expect(participantNameInputs).toHaveCount(3);
  await expect(participantEmailInputs).toHaveCount(3);
  await expect(
    page.locator('input[name="group.participants.3.name"]'),
  ).toHaveCount(0);
});
