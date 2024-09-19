import { useQuery } from '@tanstack/react-query';
import GetCommunityById from '../utils/GetCommunityById';

/**
 * 
 * @param id - The `useGetCommunityById` function fetches community data by ID using a query with caching enabled.
 * @remarks
 * queryKey: ['community', id] - The `queryKey` is an array that specifies the query key for easy refetching.
 * queryFn: GetCommunityById - The `queryFn` is a function that fetches community data by ID.
 * staleTime: 1000 * 60 * 60 - The `staleTime` is set to 1 hour (60 minutes * 60 seconds).
 * enabled: id !== '' - The `enabled` option ensures that the query is only executed when `id` is not an empty string.
 * @example
 * You can destructure different properties according to Tanstack ReactQuery Documentation.
 * ```tsx
 * const { data, isLoading, error } = useGetCommunityById('1');
 * ```
 * @link https://tanstack.com/query/v3/docs/framework/react/guides/queries
 * @returns 
 */
export const useGetCommunityById = (id: string) => {
  return useQuery({
    queryKey: ['community', id],
    queryFn: () => GetCommunityById(id),
    staleTime: 1000 * 60 * 60,
    enabled: id !== ''
  });
};