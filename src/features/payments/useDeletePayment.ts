import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeletePayment } from './DeletePayment';
import { paymentsQueryKeys } from './paymentsTypes';

export const useDeletePayment = (hoaId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeletePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: paymentsQueryKeys.filters({ hoaId }),
      });
    },
    retry: false,
  });
};
