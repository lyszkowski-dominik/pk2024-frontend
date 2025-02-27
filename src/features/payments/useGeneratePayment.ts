import { useMutation, useQueryClient } from '@tanstack/react-query';
import GeneratePayment from './GeneratePayment';
import { paymentsQueryKeys } from './paymentsTypes';

export const useGeneratePayment = (hoaId: number, propertyId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: GeneratePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: paymentsQueryKeys.filters({ hoaId, propertyId }),
      });
    },
    retry: false,
  });
};
