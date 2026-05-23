import type { ChangeEvent } from "react";

type ReviewTermsAgreementProps = {
  agreedToTerms: boolean;
  onChange: (agreedToTerms: boolean) => void;
};

export function ReviewTermsAgreement({
  agreedToTerms,
  onChange,
}: ReviewTermsAgreementProps) {
  const handleTermsChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 bg-white p-5 text-sm text-zinc-700">
      <input
        type="checkbox"
        checked={agreedToTerms}
        onChange={handleTermsChange}
        className="mt-1 size-4 cursor-pointer rounded border-zinc-300 accent-zinc-950"
      />
      <span>
        수강 신청 정보가 정확하며, 이용약관과 개인정보 처리방침에 동의합니다.
      </span>
    </label>
  );
}
