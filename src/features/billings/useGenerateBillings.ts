import { useMutation, useQueryClient } from '@tanstack/react-query';
import { billingsQueryKeys } from './billingTypes';
import GenerateBillings from './GenerateBillings';

export const useGenerateBillings = (hoaId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: GenerateBillings,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: billingsQueryKeys.filters({ hoaId }),
      });
    },
    retry: false,
  });
};
