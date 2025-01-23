import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UploadFile } from './UploadFile';
import { useNotifications } from '../../alerts/NotificationContext';

export const useUploadFile = (
  invalidateQuery?: readonly (string | number)[],
) => {
  const queryClient = useQueryClient();
  const shouldInvalidate = invalidateQuery && invalidateQuery.length > 0;
  const { addNotification } = useNotifications();

  return useMutation({
    mutationFn: UploadFile,
    onError: (e: any) => {
      addNotification(e.message);
    },
    onSuccess: () => {
      addNotification('Pomyślnie przesłano plik', 'success');

      if (shouldInvalidate) {
        queryClient.invalidateQueries({
          queryKey: invalidateQuery,
        });
      }
    },
    retry: false,
  });
};
