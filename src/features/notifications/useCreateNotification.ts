import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateNewNotification } from './CreateNewNotification';
import { notificationsQueryKeys } from './notificationTypes';

export const useCreateNotification = (hoaId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateNewNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationsQueryKeys.filters({ hoaId }),
      });
    },
    retry: false,
  });
};
