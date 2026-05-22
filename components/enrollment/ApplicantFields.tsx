import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { ApplicantStepFormValues } from "@/app/schemas/enrollment";

type ApplicantFieldsProps = {
  errors: FieldErrors<ApplicantStepFormValues>;
  register: UseFormRegister<ApplicantStepFormValues>;
};

export function ApplicantFields({ errors, register }: ApplicantFieldsProps) {
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
          {...register("applicant.name")}
          placeholder="홍길동"
          className="h-11 rounded-md border border-zinc-300 px-3 text-sm transition outline-none focus:border-zinc-950"
        />
        {errors.applicant?.name ? (
          <span className="text-xs font-medium text-red-600">
            {errors.applicant.name.message}
          </span>
        ) : null}
      </label>

      <label className="grid gap-2 text-sm font-medium text-zinc-800">
        이메일
        <input
          type="email"
          {...register("applicant.email")}
          placeholder="student@example.com"
          className="h-11 rounded-md border border-zinc-300 px-3 text-sm transition outline-none focus:border-zinc-950"
        />
        {errors.applicant?.email ? (
          <span className="text-xs font-medium text-red-600">
            {errors.applicant.email.message}
          </span>
        ) : null}
      </label>

      <label className="grid gap-2 text-sm font-medium text-zinc-800">
        전화번호
        <input
          {...register("applicant.phone")}
          placeholder="010-1234-5678"
          className="h-11 rounded-md border border-zinc-300 px-3 text-sm transition outline-none focus:border-zinc-950"
        />
        {errors.applicant?.phone ? (
          <span className="text-xs font-medium text-red-600">
            {errors.applicant.phone.message}
          </span>
        ) : null}
      </label>

      <label className="grid gap-2 text-sm font-medium text-zinc-800">
        수강 동기
        <textarea
          {...register("applicant.motivation")}
          placeholder="수강 목적이나 기대하는 점을 입력해 주세요."
          className="min-h-28 rounded-md border border-zinc-300 px-3 py-2 text-sm transition outline-none focus:border-zinc-950"
        />
        {errors.applicant?.motivation ? (
          <span className="text-xs font-medium text-red-600">
            {errors.applicant.motivation.message}
          </span>
        ) : null}
      </label>
    </fieldset>
  );
}
