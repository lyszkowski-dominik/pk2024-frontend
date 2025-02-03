import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ratesQueryKeys } from './ratesTypes';
import { UpdateRate } from './updateRate';

export const useUpdateRate = (hoaId: number, id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateRate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ratesQueryKeys.filters({ hoaId }),
      });
      queryClient.invalidateQueries({
        queryKey: ratesQueryKeys.details(id),
      });
    },
    retry: false,
  });
};
