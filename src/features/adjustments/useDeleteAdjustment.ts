import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteAdjustment } from './DeleteAdjustment';
import { adjustmentsQueryKeys } from './adjustmentsTypes';

export const useDeleteAdjustment = (hoaId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteAdjustment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adjustmentsQueryKeys.filters({ hoaId }),
      });
    },
    retry: false,
  });
};
