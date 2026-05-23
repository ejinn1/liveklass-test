import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type {
  ApplicantStepFormValues,
  GroupApplicantStepFormValues,
} from "@/schemas/enrollment";
import { EnrollmentFormField } from "@/components/enrollment/EnrollmentFormField";
import { EnrollmentInput } from "@/components/enrollment/EnrollmentInput";

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
        <EnrollmentInput
          {...register(`group.participants.${index}.name`)}
          placeholder="홍길동"
          className="bg-white"
        />
      </EnrollmentFormField>

      <EnrollmentFormField
        label={`참가자 ${index + 1} 이메일`}
        errorMessage={errors.group?.participants?.[index]?.email?.message}
      >
        <EnrollmentInput
          type="email"
          {...register(`group.participants.${index}.email`)}
          placeholder="student@example.com"
          className="bg-white"
        />
      </EnrollmentFormField>
    </div>
  );
}
