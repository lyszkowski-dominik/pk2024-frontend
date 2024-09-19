import { useQuery } from '@tanstack/react-query';
import GetOwners from '../utils/GetOwners';
import type { GetOwnersData } from '../types/OwnersTypes';

/**
 *
 * @param {GetOwnersData} - The `useGetOwners` function fetches owner data using a query with caching enabled.
 * @remarks
 * queryKey: ['loginCheck'] - The `queryKey` is an array that specifies the query key for easy refetching.
 * queryFn: () => GetOwners({ role, hoaID, page }) - The `queryFn` is a function that fetches owner data.
 *  retry: false - The `retry` option ensures that the query is not retried on error.
 * staleTime: 1000 * 60 * 60 - The `staleTime` is set to 1 hour (60 minutes * 60 seconds).
 * @example
 * You can destructure different properties according to Tanstack ReactQuery Documentation.
 * ```tsx
 * const { data, isLoading, error } = useGetOwners({ role: 'admin', hoaID: 1, page: 1 });
 * ```
 * @returns the result of the useGetOwners hook.
 */
export const useGetOwners = ({ role, hoaID, page }: GetOwnersData) => {
  return useQuery({
    queryKey: ['loginCheck'],
    queryFn: () =>
      GetOwners({
        role,
        hoaID,
        page,
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
