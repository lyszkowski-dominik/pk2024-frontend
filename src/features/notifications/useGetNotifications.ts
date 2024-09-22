import { useQuery } from '@tanstack/react-query';
import type { GetNotificationsData } from './notificationTypes';
import GetNotifications from './GetNotifications';

/**
 * 
 * @param {GetNotificationsData} - The `useGetNotifications` function fetches notification data using a query with caching enabled.
 * @remarks
 * queryKey: ['notifications'] - The `queryKey` is an array that specifies the query key for easy refetching.
 * queryFn: () => GetNotifications({ hoaID, page, pageSize }) - The `queryFn` is a function that fetches notification data.
 * retry: false - The `retry` option ensures that the query is not retried on error.
 * staleTime: 1000 * 60 * 60 - The `staleTime` is set to 1 hour (60 minutes * 60 seconds).
 * @example
 * You can destructure different properties according to Tanstack ReactQuery Documentation.
 * ```tsx
 * const { data, isLoading, error } = useGetNotifications({ hoaID: 1, page: 1, pageSize: 10 });
 * ```
 * @returns the result of the useGetNotifications hook. 
 */
export const useGetNotifications = ({
  hoaID,
  page,
  pageSize,
}: GetNotificationsData) => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () =>
      GetNotifications({
        hoaID,
        page,
        pageSize,
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
