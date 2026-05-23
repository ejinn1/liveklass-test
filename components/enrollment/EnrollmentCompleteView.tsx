import type { SubmittedEnrollment } from "@/hooks/useEnrollmentSubmit";

type EnrollmentCompleteViewProps = {
  submittedEnrollment: SubmittedEnrollment;
};

export function EnrollmentCompleteView({
  submittedEnrollment,
}: EnrollmentCompleteViewProps) {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-8 sm:px-8 lg:px-10">
      <div className="rounded-lg border border-zinc-200 bg-white p-8">
        <p className="text-sm font-semibold text-emerald-700">신청 완료</p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-950">
          수강 신청이 완료되었습니다
        </h1>
        <dl className="mt-6 grid gap-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">신청 번호</dt>
            <dd className="font-semibold text-zinc-950">
              {submittedEnrollment.result.enrollmentId}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">상태</dt>
            <dd className="font-semibold text-zinc-950">
              {submittedEnrollment.result.status}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">신청 강의</dt>
            <dd className="text-right font-semibold text-zinc-950">
              {submittedEnrollment.courseTitle}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
