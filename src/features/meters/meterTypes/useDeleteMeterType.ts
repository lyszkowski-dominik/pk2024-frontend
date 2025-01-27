import { useMutation, useQueryClient } from '@tanstack/react-query';
import { meterTypesQueryKeys } from './meterTypesUtlis';
import DeleteMeterType from './DeleteMeterType';

export const useDeleteMeterType = (hoaId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteMeterType,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: meterTypesQueryKeys.filters({ hoaId }),
      });
    },
    retry: false,
  });
};
