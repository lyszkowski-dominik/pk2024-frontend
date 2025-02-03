import { useMutation, useQueryClient } from '@tanstack/react-query';
import { meterTypesQueryKeys } from './meterTypesUtlis';
import CreateMeterType from './CreateMeterType';

export const useCreateMeterType = (hoaId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateMeterType,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: meterTypesQueryKeys.filters({ hoaId }),
      });
    },
    retry: false,
  });
};
