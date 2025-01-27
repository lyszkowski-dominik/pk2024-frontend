import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateMeter } from './CreateMeter';
import { metersQueryKeys } from './metersUtils';

export const useCreateMeter = (hoaId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateMeter,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: metersQueryKeys.filters({ hoaId }),
      });
    },
    retry: false,
  });
};
