import { useQuery } from '@tanstack/react-query';
import type { GetRequestData, Request } from './reqeustTypes';
import GetRequest from './GetRequest';

/**
 * 
 * @param {GetRequestData} - The `useGetRequest` function fetches request data using a query with caching enabled.
 * @remarks
 * queryKey: ['getRequest'] - The `queryKey` is an array that specifies the query key for easy refetching.
 * queryFn: () => GetRequest({ id }) - The `queryFn` is a function that fetches request data.
 * retry: false - The `retry` option ensures that the query is not retried on error.
 * staleTime: 1000 * 60 * 60 - The `staleTime` is set to 1 hour (60 minutes * 60 seconds).
 * @example
 * You can destructure different properties according to Tanstack ReactQuery Documentation.
 * ```tsx
 * const { data, isLoading, error } = useGetRequest({ id: 1 });
 * ```
 * @returns the result of the useGetRequest hook. 
 */
export const useGetRequest = ({ id }: GetRequestData) => {
  return useQuery<Request>({
    queryKey: ['getRequest'],
    queryFn: () =>
      GetRequest({
        id,
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
