import type { ApplicantInput } from "@/types/enrollment";
import { formatPhoneNumber } from "@/utils/enrollmentForm";

type ReviewApplicantSectionProps = {
  applicant: ApplicantInput;
  onEdit: () => void;
};

export function ReviewApplicantSection({
  applicant,
  onEdit,
}: ReviewApplicantSectionProps) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-base font-semibold text-zinc-950">수강생 정보</h2>
        <button
          type="button"
          aria-label="수강생 정보 수정"
          onClick={onEdit}
          className="cursor-pointer text-sm font-semibold text-zinc-700 underline-offset-4 hover:underline"
        >
          수정
        </button>
      </div>

      <dl className="mt-4 grid gap-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-zinc-500">이름</dt>
          <dd className="font-medium text-zinc-950">{applicant.name}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-zinc-500">이메일</dt>
          <dd className="font-medium text-zinc-950">{applicant.email}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-zinc-500">전화번호</dt>
          <dd className="font-medium text-zinc-950">
            {formatPhoneNumber(applicant.phone)}
          </dd>
        </div>
        {applicant.motivation ? (
          <div className="grid gap-1">
            <dt className="text-zinc-500">수강 동기</dt>
            <dd className="leading-6 text-zinc-950">{applicant.motivation}</dd>
          </div>
        ) : null}
      </dl>
    </section>
  );
}
