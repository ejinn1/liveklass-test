import type { GroupInput, ParticipantInput } from "@/app/types/enrollment";
import { syncParticipantsWithHeadCount } from "@/app/utils/enrollmentForm";
import { ParticipantFields } from "@/components/enrollment/ParticipantFields";

type GroupFieldsProps = {
  group: GroupInput;
  onChange: (group: Partial<GroupInput>) => void;
};

export function GroupFields({ group, onChange }: GroupFieldsProps) {
  const handleParticipantChange = (
    index: number,
    participant: Partial<ParticipantInput>,
  ) => {
    onChange({
      participants: group.participants.map(
        (currentParticipant, currentIndex) =>
          currentIndex === index
            ? {
                ...currentParticipant,
                ...participant,
              }
            : currentParticipant,
      ),
    });
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
          value={group.organizationName}
          onChange={(event) =>
            onChange({
              organizationName: event.target.value,
            })
          }
          placeholder="라이브클래스 팀"
          className="h-11 rounded-md border border-zinc-300 px-3 text-sm transition outline-none focus:border-zinc-950"
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-zinc-800">
        신청 인원수
        <input
          type="number"
          min={2}
          max={10}
          value={group.headCount}
          onChange={(event) => {
            const headCount = Math.min(
              Math.max(Number(event.target.value) || 2, 2),
              10,
            );

            onChange({
              headCount,
              participants: syncParticipantsWithHeadCount(
                group.participants,
                headCount,
              ),
            });
          }}
          className="h-11 rounded-md border border-zinc-300 px-3 text-sm transition outline-none focus:border-zinc-950"
        />
      </label>

      <ParticipantFields
        participants={group.participants}
        onChange={handleParticipantChange}
      />

      <label className="grid gap-2 text-sm font-medium text-zinc-800">
        담당자 연락처
        <input
          value={group.contactPerson}
          onChange={(event) =>
            onChange({
              contactPerson: event.target.value,
            })
          }
          placeholder="010-1234-5678"
          className="h-11 rounded-md border border-zinc-300 px-3 text-sm transition outline-none focus:border-zinc-950"
        />
      </label>
    </fieldset>
  );
}
