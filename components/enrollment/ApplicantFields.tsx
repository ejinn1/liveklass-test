import type { ApplicantInput } from "@/app/types/enrollment";

type ApplicantFieldsProps = {
  applicant: ApplicantInput;
  onChange: (applicant: Partial<ApplicantInput>) => void;
};

export function ApplicantFields({ applicant, onChange }: ApplicantFieldsProps) {
  return (
    <fieldset className="space-y-5 rounded-lg border border-zinc-200 bg-white p-5">
      <div>
        <legend className="text-base font-semibold text-zinc-950">
          수강생 정보
        </legend>
        <p className="mt-1 text-sm text-zinc-500">
          신청자 본인의 기본 정보를 입력해 주세요.
        </p>
      </div>

      <label className="grid gap-2 text-sm font-medium text-zinc-800">
        이름
        <input
          value={applicant.name}
          onChange={(event) => onChange({ name: event.target.value })}
          placeholder="홍길동"
          className="h-11 rounded-md border border-zinc-300 px-3 text-sm transition outline-none focus:border-zinc-950"
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-zinc-800">
        이메일
        <input
          type="email"
          value={applicant.email}
          onChange={(event) => onChange({ email: event.target.value })}
          placeholder="student@example.com"
          className="h-11 rounded-md border border-zinc-300 px-3 text-sm transition outline-none focus:border-zinc-950"
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-zinc-800">
        전화번호
        <input
          value={applicant.phone}
          onChange={(event) => onChange({ phone: event.target.value })}
          placeholder="010-1234-5678"
          className="h-11 rounded-md border border-zinc-300 px-3 text-sm transition outline-none focus:border-zinc-950"
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-zinc-800">
        수강 동기
        <textarea
          value={applicant.motivation}
          onChange={(event) => onChange({ motivation: event.target.value })}
          placeholder="수강 목적이나 기대하는 점을 입력해 주세요."
          className="min-h-28 rounded-md border border-zinc-300 px-3 py-2 text-sm transition outline-none focus:border-zinc-950"
        />
      </label>
    </fieldset>
  );
}
