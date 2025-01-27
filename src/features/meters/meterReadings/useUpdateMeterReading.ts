import { useMutation, useQueryClient } from '@tanstack/react-query';
import { metersReadingsQueryKeys } from './meterReadingsTypes';
import { UpdateMeterReading } from './UpdateMeterReadings';
import { metersQueryKeys } from '../metersDevices/metersUtils';

export const useUpdateMeterReading = (
  id: number,
  hoaId?: number,
  meterId?: number,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdateMeterReading,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: metersReadingsQueryKeys.filters({
          hoaId,
          meterId,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: metersReadingsQueryKeys.details(id),
      });
      meterId &&
        queryClient.invalidateQueries({
          queryKey: metersQueryKeys.details(meterId),
        });
    },
    retry: false,
  });
};
