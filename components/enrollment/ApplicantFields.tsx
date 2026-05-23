import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { ApplicantStepFormValues } from "@/schemas/enrollment";
import { formatPhoneNumberInput } from "@/utils/enrollmentForm";
import { EnrollmentFormField } from "@/components/enrollment/EnrollmentFormField";
import { EnrollmentInput } from "@/components/enrollment/EnrollmentInput";

type ApplicantFieldsProps = {
  errors: FieldErrors<ApplicantStepFormValues>;
  register: UseFormRegister<ApplicantStepFormValues>;
};

export function ApplicantFields({ errors, register }: ApplicantFieldsProps) {
  const phoneRegister = register("applicant.phone", {
    onChange: (event) => {
      event.target.value = formatPhoneNumberInput(event.target.value);
    },
  });

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

      <EnrollmentFormField
        label="이름"
        required
        errorMessage={errors.applicant?.name?.message}
      >
        <EnrollmentInput {...register("applicant.name")} placeholder="홍길동" />
      </EnrollmentFormField>

      <EnrollmentFormField
        label="이메일"
        required
        errorMessage={errors.applicant?.email?.message}
      >
        <EnrollmentInput
          type="email"
          {...register("applicant.email")}
          placeholder="student@example.com"
        />
      </EnrollmentFormField>

      <EnrollmentFormField
        label="전화번호"
        required
        errorMessage={errors.applicant?.phone?.message}
      >
        <EnrollmentInput {...phoneRegister} placeholder="010-1234-5678" />
      </EnrollmentFormField>

      <EnrollmentFormField
        label="수강 동기"
        errorMessage={errors.applicant?.motivation?.message}
      >
        <textarea
          {...register("applicant.motivation")}
          placeholder="수강 목적이나 기대하는 점을 입력해 주세요."
          className="min-h-28 rounded-md border border-zinc-300 px-3 py-2 text-sm transition outline-none focus:border-zinc-950"
        />
      </EnrollmentFormField>
    </fieldset>
  );
}
