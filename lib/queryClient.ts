import { QueryClient } from "@tanstack/react-query";

const SECOND = 1000;
const MINUTE = SECOND * 60;

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: MINUTE * 10,
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: MINUTE,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
