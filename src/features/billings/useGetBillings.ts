import { useQuery } from '@tanstack/react-query';
import type { ListRequestProperty } from '../../types/types';
import GetBillings from './GetBillings';

/**
 *
 * @param {ListRequestProperty} - The `useGetBillings` function fetches billing data using a query with caching enabled.
 * @remarks
 * queryKey: ['useGetBillings'] - The `queryKey` is an array that specifies the query key for easy refetching.
 * queryFn: () => GetBillings({ page, pageSize }) - The `queryFn` is a function that fetches billing data.
 * retry: false - The `retry` option ensures that the query is not retried on error.
 * staleTime: 1000 * 60 * 60 - The `staleTime` is set to 1 hour (60 minutes * 60 seconds).
 * @example
 * You can destructure different properties according to Tanstack ReactQuery Documentation.
 * ```tsx
 * const { data, isLoading, error } = useGetBillings({ page: 1, pageSize: 10 });
 * ```
 * @link https://tanstack.com/query/v3/docs/framework/react/guides/queries
 * @returns the result of the useGetBillings hook.
 */
export const useGetBillings = ({ page, pageSize }: ListRequestProperty) => {
  return useQuery({
    queryKey: ['useGetBillings'],
    queryFn: () =>
      GetBillings({
        page,
        pageSize,
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
