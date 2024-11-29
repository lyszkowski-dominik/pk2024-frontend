import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteFile } from './DeleteFile';
import { useNotifications } from '../../alerts/NotificationContext';

export const useDeleteFile = (
  invalidateQuery?: readonly (string | number)[],
) => {
  const queryClient = useQueryClient();
  const shouldInvalidate = invalidateQuery && invalidateQuery.length > 0;
  const { addNotification } = useNotifications();

  return useMutation({
    mutationFn: DeleteFile,
    onSuccess: () => {
      addNotification('File deleted', 'success');
      if (shouldInvalidate) {
        queryClient.invalidateQueries({
          queryKey: invalidateQuery,
        });
      }
    },
    onError: () => {
      addNotification('Nie udało się usunąć pliku.', 'error');
    },
    retry: false,
  });
};
