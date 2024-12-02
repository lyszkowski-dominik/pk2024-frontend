import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteNotification } from './DeleteNotification';
import { notificationsQueryKeys } from './notificationTypes';

export const useDeleteNotification = (hoa: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationsQueryKeys.filters({ hoaId: hoa }),
      });
    },
    retry: false,
  });
};
