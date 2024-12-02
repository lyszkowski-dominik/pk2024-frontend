import { useQuery } from '@tanstack/react-query';
import {
  notificationsQueryKeys,
  type GetNotificationsRequest,
} from './notificationTypes';
import GetNotifications from './GetNotifications';

export const useGetNotifications = (params: GetNotificationsRequest) => {
  return useQuery({
    queryKey: notificationsQueryKeys.filters(params),
    queryFn: () => GetNotifications(params),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: params.hoaId > 0,
  });
};
