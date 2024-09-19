import { useQuery } from '@tanstack/react-query';
import type { GetRequestTypesData } from '../types/reqeustTypes';
import GetRequestTypes from '../utils/GetRequestTypes';

/**
 * 
 * @param {GetRequestTypesData} - The `useGetRequestTypes` function fetches request types data using a query with caching enabled.
 * @remarks
 * queryKey: ['getRequestTypes'] - The `queryKey` is an array that specifies the query key for easy refetching.
 * queryFn: () => GetRequestTypes({ hoaID, page, pageSize }) - The `queryFn` is a function that fetches request types data.
 * retry: false - The `retry` option ensures that the query is not retried on error.
 * staleTime: 1000 * 60 * 60 - The `staleTime` is set to 1 hour (60 minutes * 60 seconds).
 * @returns the result of the useGetRequestTypes hook.
 */
export const useGetRequestTypes = ({
  hoaID,
  page,
  pageSize,
}: GetRequestTypesData) => {
  return useQuery({
    queryKey: ['getRequestTypes'],
    queryFn: () =>
      GetRequestTypes({
        hoaID,
        page,
        pageSize,
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
