import { create } from "zustand";

import type { EnrollmentStepStore } from "@/app/types/enrollment";

export const useEnrollmentStepStore = create<EnrollmentStepStore>()((set) => ({
  currentStep: 1,
  goToStep: (step) =>
    set({
      currentStep: step,
    }),
}));
