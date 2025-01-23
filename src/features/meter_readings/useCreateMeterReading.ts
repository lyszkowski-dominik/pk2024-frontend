import { useMutation, useQueryClient } from '@tanstack/react-query';
import { metersReadingsQueryKeys } from './metersTypes';
import { CreateMeterReading } from './CreateMeterReading';

export const useCreateMeterReading = (propertyId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateMeterReading,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: metersReadingsQueryKeys.filters({ propertyId }),
      });
    },
    retry: false,
  });
};
