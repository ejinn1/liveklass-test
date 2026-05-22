import type { ChangeEvent } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import type {
  ApplicantStepFormValues,
  GroupApplicantStepFormValues,
} from "@/app/schemas/enrollment";
import type { GroupInput } from "@/app/types/enrollment";
import { syncParticipantsWithHeadCount } from "@/app/utils/enrollmentForm";
import { ParticipantFields } from "@/components/enrollment/ParticipantFields";

type GroupFieldsProps = {
  errors: FieldErrors<GroupApplicantStepFormValues>;
  group: GroupInput;
  register: UseFormRegister<ApplicantStepFormValues>;
  setValue: UseFormSetValue<ApplicantStepFormValues>;
};

export function GroupFields({
  errors,
  group,
  register,
  setValue,
}: GroupFieldsProps) {
  const handleHeadCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const headCount = Math.min(
      Math.max(Number(event.target.value) || 2, 2),
      10,
    );

    setValue(
      "group.participants",
      syncParticipantsWithHeadCount(group.participants, headCount),
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  };

  return (
    <fieldset className="space-y-5 rounded-lg border border-zinc-200 bg-white p-5">
      <div>
        <legend className="text-base font-semibold text-zinc-950">
          단체 신청 정보
        </legend>
        <p className="mt-1 text-sm text-zinc-500">
          단체 신청에 필요한 추가 정보를 입력해 주세요.
        </p>
      </div>

      <label className="grid gap-2 text-sm font-medium text-zinc-800">
        단체명
        <input
          {...register("group.organizationName")}
          placeholder="라이브클래스 팀"
          className="h-11 rounded-md border border-zinc-300 px-3 text-sm transition outline-none focus:border-zinc-950"
        />
        {errors.group?.organizationName ? (
          <span className="text-xs font-medium text-red-600">
            {errors.group.organizationName.message}
          </span>
        ) : null}
      </label>

      <label className="grid gap-2 text-sm font-medium text-zinc-800">
        신청 인원수
        <input
          type="number"
          min={2}
          max={10}
          {...register("group.headCount", {
            valueAsNumber: true,
            onChange: handleHeadCountChange,
          })}
          className="h-11 rounded-md border border-zinc-300 px-3 text-sm transition outline-none focus:border-zinc-950"
        />
        {errors.group?.headCount ? (
          <span className="text-xs font-medium text-red-600">
            {errors.group.headCount.message}
          </span>
        ) : null}
      </label>

      <ParticipantFields
        errors={errors}
        participantsLength={group.participants.length}
        register={register}
      />

      <label className="grid gap-2 text-sm font-medium text-zinc-800">
        담당자 연락처
        <input
          {...register("group.contactPerson")}
          placeholder="010-1234-5678"
          className="h-11 rounded-md border border-zinc-300 px-3 text-sm transition outline-none focus:border-zinc-950"
        />
        {errors.group?.contactPerson ? (
          <span className="text-xs font-medium text-red-600">
            {errors.group.contactPerson.message}
          </span>
        ) : null}
      </label>
    </fieldset>
  );
}
