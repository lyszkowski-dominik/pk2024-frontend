import { useQuery } from '@tanstack/react-query';
import type { GetRequestsData } from './reqeustTypes';
import GetRequests from './GetRequests';

/**
 * 
 * @param {GetRequestsData} - The `useGetRequests` function fetches request data using a query with caching enabled.
 * @remarks
 * queryKey: ['getRequests', queryKey] - The `queryKey` is an array that specifies the query key for easy refetching.
 * queryFn: () => GetRequests({ hoaID, page, pageSize, state, assignedToMe }) - The `queryFn` is a function that fetches request data.
 * retry: false - The `retry` option ensures that the query is not retried on error.
 * staleTime: 1000 * 60 * 60 - The `staleTime` is set to 1 hour (60 minutes * 60 seconds).
 * @example
 * You can destructure different properties according to Tanstack ReactQuery Documentation.
 * ```tsx
 * const { data, isLoading, error } = useGetRequests({ hoaID: 1, page: 1, pageSize: 10, state: 'open', assignedToMe: true, queryKey: '1' });
 * ```
 * @returns the result of the useGetRequests hook. 
 */
export const useGetRequests = ({
  hoaID,
  page,
  pageSize,
  state,
  assignedToMe,
  queryKey
}: GetRequestsData) => {
  return useQuery({
    queryKey: ['getRequests', queryKey],
    queryFn: () =>
      GetRequests({
        hoaID,
        page,
        pageSize,
        state,
        assignedToMe
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
