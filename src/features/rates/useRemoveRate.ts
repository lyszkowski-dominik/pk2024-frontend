import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RemoveRate } from './RemoveRate';
import { ratesQueryKeys } from './ratesTypes';

export const useRemoveRate = (hoa: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: RemoveRate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ratesQueryKeys.filters({ hoaId: hoa }),
      });
    },
    retry: false,
  });
};
