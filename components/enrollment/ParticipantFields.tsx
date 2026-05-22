import type { ParticipantInput } from "@/app/types/enrollment";

type ParticipantFieldsProps = {
  participants: ParticipantInput[];
  onChange: (index: number, participant: Partial<ParticipantInput>) => void;
};

export function ParticipantFields({
  participants,
  onChange,
}: ParticipantFieldsProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-zinc-900">참가자 명단</p>
      {participants.map((participant, index) => (
        <div
          key={index}
          className="grid gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-4 sm:grid-cols-2"
        >
          <label className="grid gap-2 text-sm font-medium text-zinc-800">
            참가자 {index + 1} 이름
            <input
              value={participant.name}
              onChange={(event) =>
                onChange(index, {
                  name: event.target.value,
                })
              }
              placeholder="홍길동"
              className="h-11 rounded-md border border-zinc-300 bg-white px-3 text-sm transition outline-none focus:border-zinc-950"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-zinc-800">
            참가자 {index + 1} 이메일
            <input
              type="email"
              value={participant.email}
              onChange={(event) =>
                onChange(index, {
                  email: event.target.value,
                })
              }
              placeholder="student@example.com"
              className="h-11 rounded-md border border-zinc-300 bg-white px-3 text-sm transition outline-none focus:border-zinc-950"
            />
          </label>
        </div>
      ))}
    </div>
  );
}
