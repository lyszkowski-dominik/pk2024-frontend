import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateMeter } from './UpdateMeter';
import { metersQueryKeys } from './metersUtils';

export const useEditMeter = (id: number, hoaId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdateMeter,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: metersQueryKeys.details(id),
      });
      queryClient.invalidateQueries({
        queryKey: metersQueryKeys.filters({ hoaId }),
      });
    },
    retry: false,
  });
};
