import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteMeter } from './DeleteMeter';
import { metersQueryKeys } from './metersUtils';

export const useDeleteMeter = (hoaId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteMeter,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: metersQueryKeys.filters({ hoaId }),
      });
    },
    retry: false,
  });
};
