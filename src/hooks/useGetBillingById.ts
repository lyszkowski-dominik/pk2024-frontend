import { useQuery } from '@tanstack/react-query';
import GetBillingById from '../utils/GetBillingById';

/**
 * The `useGetBillingById` function fetches billing data by ID using a query with caching enabled.
 * @param {number} id - The `id` parameter in the `useGetBillingById` function is a number that
 * represents the unique identifier of the billing record you want to retrieve.
 * @remarks
 * queryKey: ['billing', id] - The `queryKey` is an array that specifies the query key for easy refetching.
 * queryFn: () => GetBillingById(id) - The `queryFn` is a function that fetches billing data by ID.
 * staleTime: 1000 * 60 * 60 - The `staleTime` is set to 1 hour (60 minutes * 60 seconds).
 * enabled: id !== -1 - The `enabled` option ensures that the query is only executed when `id` is not equal to -1.
 * @example
 * You can destructure different properties according to Tanstack ReactQuery Documentation.
 * ```tsx
 * const { data, isLoading, error } = useGetBillingById(1);
 * ```
 * @link https://tanstack.com/query/v3/docs/framework/react/guides/queries
 * @returns the result of the useGetBillingById hook.
 */
export const useGetBillingById = (id: number) => {
  return useQuery({
    queryKey: ['billing', id],
    queryFn: () => GetBillingById(id),
    staleTime: 1000 * 60 * 60,
    enabled: id !== -1,
  });
};
