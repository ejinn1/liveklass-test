export type EnrollmentStep = 1 | 2 | 3;

export type EnrollmentType = "personal" | "group";

export type ApplicantInput = {
  name: string;
  email: string;
  phone: string;
  motivation: string;
};

export type ParticipantInput = {
  name: string;
  email: string;
};

export type GroupInput = {
  organizationName: string;
  headCount: number;
  participants: ParticipantInput[];
  contactPerson: string;
};

export type EnrollmentStepState = {
  currentStep: EnrollmentStep;
};

export type EnrollmentStepActions = {
  goToStep: (step: EnrollmentStep) => void;
};

export type EnrollmentStepStore = EnrollmentStepState & EnrollmentStepActions;

export type EnrollmentFormState = {
  hasHydrated: boolean;
  selectedCourseId: string | null;
  enrollmentType: EnrollmentType | null;
  applicant: ApplicantInput;
  group: GroupInput;
};

export type EnrollmentFormActions = {
  setHasHydrated: (hasHydrated: boolean) => void;
  setSelectedCourseId: (courseId: string | null) => void;
  setEnrollmentType: (enrollmentType: EnrollmentType | null) => void;
  setCourseSelection: (
    courseId: string,
    enrollmentType: EnrollmentType,
  ) => void;
  setApplicant: (applicant: Partial<ApplicantInput>) => void;
  setGroup: (group: Partial<GroupInput>) => void;
  resetEnrollmentForm: () => void;
};

export type EnrollmentFormStore = EnrollmentFormState & EnrollmentFormActions;
