import type { ChangeEvent } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import type {
  ApplicantStepFormValues,
  GroupApplicantStepFormValues,
} from "@/schemas/enrollment";
import type { GroupInput } from "@/types/enrollment";
import { syncParticipantsWithHeadCount } from "@/utils/enrollmentForm";
import { EnrollmentFormField } from "@/components/enrollment/EnrollmentFormField";
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

      <EnrollmentFormField
        label="단체명"
        errorMessage={errors.group?.organizationName?.message}
      >
        <input
          {...register("group.organizationName")}
          placeholder="라이브클래스 팀"
          className="h-11 rounded-md border border-zinc-300 px-3 text-sm transition outline-none focus:border-zinc-950"
        />
      </EnrollmentFormField>

      <EnrollmentFormField
        label="신청 인원수"
        errorMessage={errors.group?.headCount?.message}
      >
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
      </EnrollmentFormField>

      <ParticipantFields
        errors={errors}
        participantsLength={group.participants.length}
        register={register}
      />

      <EnrollmentFormField
        label="담당자 연락처"
        errorMessage={errors.group?.contactPerson?.message}
      >
        <input
          {...register("group.contactPerson")}
          placeholder="010-1234-5678"
          className="h-11 rounded-md border border-zinc-300 px-3 text-sm transition outline-none focus:border-zinc-950"
        />
      </EnrollmentFormField>
    </fieldset>
  );
}
