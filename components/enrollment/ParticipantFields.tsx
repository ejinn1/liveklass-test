import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type {
  ApplicantStepFormValues,
  GroupApplicantStepFormValues,
} from "@/schemas/enrollment";

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
        <div
          key={index}
          className="grid gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-4 sm:grid-cols-2"
        >
          <label className="grid gap-2 text-sm font-medium text-zinc-800">
            참가자 {index + 1} 이름
            <input
              {...register(`group.participants.${index}.name`)}
              placeholder="홍길동"
              className="h-11 rounded-md border border-zinc-300 bg-white px-3 text-sm transition outline-none focus:border-zinc-950"
            />
            {errors.group?.participants?.[index]?.name ? (
              <span className="text-xs font-medium text-red-600">
                {errors.group.participants[index]?.name?.message}
              </span>
            ) : null}
          </label>

          <label className="grid gap-2 text-sm font-medium text-zinc-800">
            참가자 {index + 1} 이메일
            <input
              type="email"
              {...register(`group.participants.${index}.email`)}
              placeholder="student@example.com"
              className="h-11 rounded-md border border-zinc-300 bg-white px-3 text-sm transition outline-none focus:border-zinc-950"
            />
            {errors.group?.participants?.[index]?.email ? (
              <span className="text-xs font-medium text-red-600">
                {errors.group.participants[index]?.email?.message}
              </span>
            ) : null}
          </label>
        </div>
      ))}
    </div>
  );
}
