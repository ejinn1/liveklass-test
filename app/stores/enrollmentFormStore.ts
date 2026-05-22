import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type {
  ApplicantInput,
  EnrollmentFormState,
  EnrollmentFormStore,
  GroupInput,
} from "@/app/types/enrollment";
import { syncParticipantsWithHeadCount } from "@/app/utils/enrollmentForm";

const initialApplicant: ApplicantInput = {
  name: "",
  email: "",
  phone: "",
  motivation: "",
};

const initialGroup: GroupInput = {
  organizationName: "",
  headCount: 2,
  participants: syncParticipantsWithHeadCount([], 2),
  contactPerson: "",
};

const initialEnrollmentFormState: EnrollmentFormState = {
  selectedCourseId: null,
  enrollmentType: null,
  applicant: initialApplicant,
  group: initialGroup,
};

export const useEnrollmentFormStore = create<EnrollmentFormStore>()(
  persist(
    (set) => ({
      ...initialEnrollmentFormState,
      setSelectedCourseId: (courseId) =>
        set({
          selectedCourseId: courseId,
        }),
      setEnrollmentType: (enrollmentType) =>
        set({
          enrollmentType,
        }),
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
      resetEnrollmentForm: () =>
        set({
          ...initialEnrollmentFormState,
        }),
    }),
    {
      name: "liveklass-enrollment-form",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
