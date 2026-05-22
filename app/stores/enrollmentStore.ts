import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type {
  ApplicantInput,
  EnrollmentState,
  EnrollmentStore,
  GroupInput,
  ParticipantInput,
} from "@/app/types/enrollment";

function createEmptyParticipants(count: number): ParticipantInput[] {
  return Array.from({ length: count }, () => ({
    name: "",
    email: "",
  }));
}

const initialApplicant: ApplicantInput = {
  name: "",
  email: "",
  phone: "",
  motivation: "",
};

const initialGroup: GroupInput = {
  organizationName: "",
  headCount: 2,
  participants: createEmptyParticipants(2),
  contactPerson: "",
};

const initialEnrollmentState: EnrollmentState = {
  currentStep: 1,
  selectedCourseId: null,
  enrollmentType: null,
  applicant: initialApplicant,
  group: initialGroup,
};

export const useEnrollmentStore = create<EnrollmentStore>()(
  persist(
    (set) => ({
      ...initialEnrollmentState,
      setCourseSelection: (courseId, enrollmentType) =>
        set({
          selectedCourseId: courseId,
          enrollmentType,
        }),
      setApplicant: (applicant) =>
        set((state) => ({
          applicant: {
            ...state.applicant,
            ...applicant,
          },
        })),
      setGroup: (group) =>
        set((state) => ({
          group: {
            ...state.group,
            ...group,
          },
        })),
      goToStep: (step) =>
        set({
          currentStep: step,
        }),
      resetEnrollment: () =>
        set({
          ...initialEnrollmentState,
        }),
    }),
    {
      name: "liveklass-enrollment",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
