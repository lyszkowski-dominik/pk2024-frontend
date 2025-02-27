import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteBilling } from './DeleteBilling';
import { billingsQueryKeys } from './billingTypes';

export const useDeleteBillling = (hoaId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteBilling,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: billingsQueryKeys.filters({ hoaId }),
      });
    },
    retry: false,
  });
};
