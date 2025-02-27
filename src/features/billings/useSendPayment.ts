import { useMutation, useQueryClient } from '@tanstack/react-query';
import SendPayment from './SendPayment';
import { billingsQueryKeys } from './billingTypes';

export const useSendPayment = (hoaId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: SendPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: billingsQueryKeys.filters({ hoaId }),
      });
    },
    retry: false,
  });
};
