import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type {
  ApplicantStepFormValues,
  GroupApplicantStepFormValues,
} from "@/schemas/enrollment";
import { ParticipantFieldItem } from "@/components/enrollment/ParticipantFieldItem";

type ParticipantFieldsProps = {
  errors: FieldErrors<GroupApplicantStepFormValues>;
  participantsLength: number;
  register: UseFormRegister<ApplicantStepFormValues>;
};

export function ParticipantFields({
  errors,
  participantsLength,
  register,
}: ParticipantFieldsProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-zinc-900">참가자 명단</p>
      {Array.from({ length: participantsLength }).map((_, index) => (
        <ParticipantFieldItem
          key={index}
          errors={errors}
          index={index}
          register={register}
        />
      ))}
    </div>
  );
}
