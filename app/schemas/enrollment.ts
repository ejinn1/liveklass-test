import { z } from "zod";

export type ApplicantStepFormValues = z.infer<typeof applicantStepSchema>;
export type GroupApplicantStepFormValues = Extract<
  ApplicantStepFormValues,
  { enrollmentType: "group" }
>;

const koreanPhoneRegex =
  /^(01[016789]-?\d{3,4}-?\d{4}|0\d{1,2}-?\d{3,4}-?\d{4})$/;

export const applicantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "이름은 2자 이상 입력해 주세요.")
    .max(20, "이름은 20자 이하로 입력해 주세요."),
  email: z
    .string()
    .trim()
    .min(1, "이메일을 입력해 주세요.")
    .email("올바른 이메일 형식으로 입력해 주세요."),
  phone: z
    .string()
    .trim()
    .min(1, "전화번호를 입력해 주세요.")
    .regex(koreanPhoneRegex, "올바른 한국 전화번호 형식으로 입력해 주세요."),
  motivation: z.string().max(300, "수강 동기는 300자 이하로 입력해 주세요."),
});

export const participantSchema = z.object({
  name: z.string().trim().min(1, "참가자 이름을 입력해 주세요."),
  email: z
    .string()
    .trim()
    .min(1, "참가자 이메일을 입력해 주세요.")
    .email("올바른 이메일 형식으로 입력해 주세요."),
});

export const groupSchema = z
  .object({
    organizationName: z.string().trim().min(1, "단체명을 입력해 주세요."),
    headCount: z
      .number()
      .min(2, "신청 인원수는 2명 이상이어야 합니다.")
      .max(10, "신청 인원수는 10명 이하이어야 합니다."),
    participants: z.array(participantSchema),
    contactPerson: z
      .string()
      .trim()
      .min(1, "담당자 연락처를 입력해 주세요.")
      .regex(koreanPhoneRegex, "올바른 한국 전화번호 형식으로 입력해 주세요."),
  })
  .superRefine((group, context) => {
    if (group.participants.length !== group.headCount) {
      context.addIssue({
        code: "custom",
        path: ["participants"],
        message: "참가자 명단은 신청 인원수와 같아야 합니다.",
      });
    }

    const emailCounts = new Map<string, number>();

    group.participants.forEach((participant) => {
      const normalizedEmail = participant.email.trim().toLowerCase();

      if (!normalizedEmail) {
        return;
      }

      emailCounts.set(
        normalizedEmail,
        (emailCounts.get(normalizedEmail) ?? 0) + 1,
      );
    });

    group.participants.forEach((participant, index) => {
      const normalizedEmail = participant.email.trim().toLowerCase();

      if (normalizedEmail && (emailCounts.get(normalizedEmail) ?? 0) > 1) {
        context.addIssue({
          code: "custom",
          path: ["participants", index, "email"],
          message: "참가자 이메일은 중복될 수 없습니다.",
        });
      }
    });
  });

export const applicantStepSchema = z.discriminatedUnion("enrollmentType", [
  z.object({
    enrollmentType: z.literal("personal"),
    applicant: applicantSchema,
  }),
  z.object({
    enrollmentType: z.literal("group"),
    applicant: applicantSchema,
    group: groupSchema,
  }),
]);
