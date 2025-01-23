import { useMutation, useQueryClient } from '@tanstack/react-query';
import { metersReadingsQueryKeys } from './metersTypes';
import { UpdateMeterReading } from './UpdateMeterReadings';

export const useUpdateMeterReading = (propertyId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdateMeterReading,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: metersReadingsQueryKeys.filters({ propertyId }),
      });
    },
    retry: false,
  });
};
