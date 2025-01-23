import { useQuery } from '@tanstack/react-query';
import GetOwnerships from './GetOwnerships';
import { OwnershipsRequest } from './ownershipTypes';

/**
 *
 * @param {PropertiesRequest} - The `useGetOwnerships` function fetches ownership data using a query with caching enabled.
 * @remarks
 * queryKey: ['getOwnerships'] - The `queryKey` is an array that specifies the query key for easy refetching.
 * queryFn: () => GetOwnerships({ page, pageSize }) - The `queryFn` is a function that fetches ownership data.
 * retry: false - The `retry` option ensures that the query is not retried on error.
 * staleTime: 1000 * 60 * 60 - The `staleTime` is set to 1 hour (60 minutes * 60 seconds).
 * @example
 * You can destructure different properties according to Tanstack ReactQuery Documentation.
 * ```tsx
 * const { data, isLoading, error } = useGetOwnerships({ page: 1, pageSize: 10 });
 * ```
 * @returns the result of the useGetOwnerships hook.
 */
export const useGetOwnerships = ({
  page,
  pageSize,
  propertyId,
}: OwnershipsRequest) => {
  return useQuery({
    queryKey: ['getOwnerships'],
    queryFn: () =>
      GetOwnerships({
        page,
        pageSize,
        propertyId,
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
