import type { ParticipantInput } from "@/app/types/enrollment";

export function createEmptyParticipant(): ParticipantInput {
  return {
    name: "",
    email: "",
  };
}

export function syncParticipantsWithHeadCount(
  participants: ParticipantInput[],
  headCount: number,
): ParticipantInput[] {
  if (participants.length === headCount) {
    return participants;
  }

  if (participants.length > headCount) {
    return participants.slice(0, headCount);
  }

  return [
    ...participants,
    ...Array.from({ length: headCount - participants.length }, () =>
      createEmptyParticipant(),
    ),
  ];
}
