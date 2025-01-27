import { useMutation, useQueryClient } from '@tanstack/react-query';
import { metersReadingsQueryKeys } from './meterReadingsTypes';
import { CreateMeterReading } from './CreateMeterReading';
import { metersQueryKeys } from '../metersDevices/metersUtils';

export const useCreateMeterReading = (hoaId?: number, meterId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateMeterReading,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: metersReadingsQueryKeys.filters({
          hoaId,
          meterId,
        }),
      });
      meterId &&
        queryClient.invalidateQueries({
          queryKey: metersQueryKeys.details(meterId),
        });
    },
    retry: false,
  });
};
