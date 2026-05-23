import type { ParticipantInput } from "@/types/enrollment";

export function createEmptyParticipant(): ParticipantInput {
  return {
    name: "",
    email: "",
  };
}

export function formatPhoneNumber(phoneNumber: string) {
  const digits = phoneNumber.replace(/\D/g, "");

  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }

  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return phoneNumber;
}

export function formatPhoneNumberInput(phoneNumber: string) {
  const digits = phoneNumber.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
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
