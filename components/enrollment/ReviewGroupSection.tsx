import type { GroupInput } from "@/types/enrollment";
import { formatPhoneNumber } from "@/utils/enrollmentForm";

type ReviewGroupSectionProps = {
  group: GroupInput;
  onEdit: () => void;
};

export function ReviewGroupSection({ group, onEdit }: ReviewGroupSectionProps) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-base font-semibold text-zinc-950">
          단체 신청 정보
        </h2>
        <button
          type="button"
          aria-label="단체 신청 정보 수정"
          onClick={onEdit}
          className="cursor-pointer text-sm font-semibold text-zinc-700 underline-offset-4 hover:underline"
        >
          수정
        </button>
      </div>

      <dl className="mt-4 grid gap-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-zinc-500">단체명</dt>
          <dd className="font-medium text-zinc-950">
            {group.organizationName}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-zinc-500">신청 인원수</dt>
          <dd className="font-medium text-zinc-950">{group.headCount}명</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-zinc-500">담당자 연락처</dt>
          <dd className="font-medium text-zinc-950">
            {formatPhoneNumber(group.contactPerson)}
          </dd>
        </div>
      </dl>

      <div className="mt-5 space-y-2">
        <p className="text-sm font-semibold text-zinc-900">참가자 명단</p>
        <div className="grid gap-2">
          {group.participants.map((participant, index) => (
            <div
              key={`${participant.email}-${index}`}
              className="flex justify-between gap-4 rounded-md bg-zinc-50 px-3 py-2 text-sm"
            >
              <span className="font-medium text-zinc-950">
                {participant.name}
              </span>
              <span className="text-zinc-600">{participant.email}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
