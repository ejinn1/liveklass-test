import { mutationOptions } from "@tanstack/react-query";

import { createEnrollment } from "@/remotes/enrollments/service";

export function createEnrollmentMutationOptions() {
  return mutationOptions({
    mutationFn: createEnrollment,
  });
}
