import { useMutation, useQueryClient } from '@tanstack/react-query';
import { metersReadingsQueryKeys } from './meterReadingsTypes';
import { DeleteMeterReading } from './DeleteMeterReading';
import { metersQueryKeys } from '../metersDevices/metersUtils';

export const useDeleteMeterReading = (hoaId?: number, meterId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteMeterReading,
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
