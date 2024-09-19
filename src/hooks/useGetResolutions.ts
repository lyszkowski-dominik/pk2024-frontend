import { useQuery } from '@tanstack/react-query';
import type { GetResolutionsData } from '../types/resolutionTypes';
import GetResolutions from '../utils/GetResolutions';

/**
 * 
 * @param {GetResolutionsData} - The `useGetResolutions` function fetches resolution data using a query with caching enabled.
 * @remarks
 * queryKey: ['xdd'] - The `queryKey` is an array that specifies the query key for easy refetching.
 * queryFn: () => GetResolutions({ hoaID, page, pageSize }) - The `queryFn` is a function that fetches resolution data.
 * retry: false - The `retry` option ensures that the query is not retried on error.
 * staleTime: 1000 * 60 * 60 - The `staleTime` is set to 1 hour (60 minutes * 60 seconds).
 * @example
 * You can destructure different properties according to Tanstack ReactQuery Documentation.
 * ```tsx
 * const { data, isLoading, error } = useGetResolutions({ hoaID: 1, page: 1, pageSize: 10 });
 * ```
 * @link https://tanstack.com/query/v3/docs/framework/react/guides/queries
 * @returns the result of the useGetResolutions hook.
 */
export const useGetResolutions = ({ hoaID, page, pageSize }: GetResolutionsData) => {
  return useQuery({
    queryKey: ['xdd'],
    queryFn: () =>
      GetResolutions({
        hoaID,
        page,
        pageSize
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
