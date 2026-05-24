import { expect, test } from "@playwright/test";

test("정원이 마감된 강의는 선택할 수 없다", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("button", { name: "프로덕트 UI 디자인 입문 강의 선택" }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "비즈니스 전략 워크숍 강의 선택" }),
  ).toBeDisabled();
});
