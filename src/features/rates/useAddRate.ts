import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RateSetState, ratesQueryKeys } from './ratesTypes';
import { AddRate } from './addRate';

export const useAddRate = (hoaId: number, state?: RateSetState) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AddRate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ratesQueryKeys.filters({ hoaId, state }),
      });
    },
    retry: false,
  });
};
