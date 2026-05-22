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

export type EnrollmentState = {
  currentStep: EnrollmentStep;
  selectedCourseId: string | null;
  enrollmentType: EnrollmentType | null;
  applicant: ApplicantInput;
  group: GroupInput;
};

export type EnrollmentActions = {
  setCourseSelection: (
    courseId: string,
    enrollmentType: EnrollmentType,
  ) => void;
  setApplicant: (applicant: Partial<ApplicantInput>) => void;
  setGroup: (group: Partial<GroupInput>) => void;
  goToStep: (step: EnrollmentStep) => void;
  resetEnrollment: () => void;
};

export type EnrollmentStore = EnrollmentState & EnrollmentActions;
