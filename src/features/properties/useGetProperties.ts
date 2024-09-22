import { useQuery } from '@tanstack/react-query';
import type { PropertiesRequest } from './propertiesTypes';
import GetProperties from './GetProperties';

/**
 * 
 * @param {PropertiesRequest} - The `useGetProperties` function fetches property data using a query with caching enabled.
 * @remarks
 * queryKey: ['loginCheck'] - The `queryKey` is an array that specifies the query key for easy refetching.
 * queryFn: () => GetProperties({ page, pageSize, hoaId }) - The `queryFn` is a function that fetches property data.
 * retry: false - The `retry` option ensures that the query is not retried on error.
 * staleTime: 1000 * 60 * 60 - The `staleTime` is set to 1 hour (60 minutes * 60 seconds).
 * @example
 * You can destructure different properties according to Tanstack ReactQuery Documentation.
 * ```tsx
 * const { data, isLoading, error } = useGetProperties({ page: 1, pageSize: 10, hoaId: 1 });
 * ```
 * @returns the result of the useGetProperties hook. 
 */
export const useGetProperties = ({ page, pageSize, hoaId }: PropertiesRequest) => {

  return useQuery({
    queryKey: ['loginCheck'],
    queryFn: () =>
      GetProperties({
        page,
        pageSize,
        hoaId
      }),
    retry: false,
    staleTime: 1000 * 60 * 60
  });
};