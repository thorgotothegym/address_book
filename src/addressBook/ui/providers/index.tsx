import React, { PropsWithChildren } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryClientProviderProps,
} from "react-query";

import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      onError: () => {
        console.log("error");
      },
    },
  },
});

export const QueryProvider = ({
  children,
  ...props
}: PropsWithChildren<Partial<QueryClientProviderProps>>) => {
  return (
    <QueryClientProvider {...props} client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
