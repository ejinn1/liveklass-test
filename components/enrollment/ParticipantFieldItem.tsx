import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type {
  ApplicantStepFormValues,
  GroupApplicantStepFormValues,
} from "@/schemas/enrollment";
import { EnrollmentFormField } from "@/components/enrollment/EnrollmentFormField";

type ParticipantFieldItemProps = {
  errors: FieldErrors<GroupApplicantStepFormValues>;
  index: number;
  register: UseFormRegister<ApplicantStepFormValues>;
};

export function ParticipantFieldItem({
  errors,
  index,
  register,
}: ParticipantFieldItemProps) {
  return (
    <div className="grid gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-4 sm:grid-cols-2">
      <EnrollmentFormField
        label={`참가자 ${index + 1} 이름`}
        errorMessage={errors.group?.participants?.[index]?.name?.message}
      >
        <input
          {...register(`group.participants.${index}.name`)}
          placeholder="홍길동"
          className="h-11 rounded-md border border-zinc-300 bg-white px-3 text-sm transition outline-none focus:border-zinc-950"
        />
      </EnrollmentFormField>

      <EnrollmentFormField
        label={`참가자 ${index + 1} 이메일`}
        errorMessage={errors.group?.participants?.[index]?.email?.message}
      >
        <input
          type="email"
          {...register(`group.participants.${index}.email`)}
          placeholder="student@example.com"
          className="h-11 rounded-md border border-zinc-300 bg-white px-3 text-sm transition outline-none focus:border-zinc-950"
        />
      </EnrollmentFormField>
    </div>
  );
}
