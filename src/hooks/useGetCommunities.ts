import { useQuery } from '@tanstack/react-query';
import GetCommunities from '../utils/GetCommunities';

/**
 * 
 * @param isLoggedIn - The `isLoggedIn` parameter in the `useGetCommunities` function is a boolean that represents the user's login status.
 * @remarks
 * queryKey: ['communities'] - The `queryKey` is an array that specifies the query key for easy refetching.
 * queryFn: GetCommunities - The `queryFn` is a function that fetches community data.
 * staleTime: 1000 * 60 * 60 - The `staleTime` is set to 1 hour (60 minutes * 60 seconds).
 * enabled: isLoggedIn - The `enabled` option ensures that the query is only executed when the user is logged in.
 * @example
 * You can destructure different properties according to Tanstack ReactQuery Documentation.
 * ```tsx
 * const { data, isLoading, error } = useGetCommunities(isLoggedIn);
 * ```
 * @link https://tanstack.com/query/v3/docs/framework/react/guides/queries
 * @returns the result of the useGetCommunities hook.
 */
export const useGetCommunities = (isLoggedIn: boolean) => {
  return useQuery({
    queryKey: ['communities'],
    queryFn: GetCommunities,
    staleTime: 1000 * 60 * 60,
    enabled: isLoggedIn
  });
};