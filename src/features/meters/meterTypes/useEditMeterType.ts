import { useMutation, useQueryClient } from '@tanstack/react-query';
import { meterTypesQueryKeys } from './meterTypesUtlis';
import EditMeterType from './EditMeterType';

export const useEditMeterType = (id: number, hoaId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: EditMeterType,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: meterTypesQueryKeys.details(id),
      });
      queryClient.invalidateQueries({
        queryKey: meterTypesQueryKeys.filters({ hoaId }),
      });
    },
    retry: false,
  });
};
