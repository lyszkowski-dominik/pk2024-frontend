import { useQuery } from '@tanstack/react-query';
import type { GetNotificationsData } from '../types/notificationTypes';
import GetNotifications from '../utils/GetNotifications';

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
