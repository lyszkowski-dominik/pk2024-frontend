import { useMutation, useQueryClient } from '@tanstack/react-query';
import { metersReadingsQueryKeys } from './metersTypes';
import { DeleteMeterReading } from './DeleteMeterReading';

export const useDeleteMeterReading = (propertyId: number, id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteMeterReading,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: metersReadingsQueryKeys.filters({ propertyId }),
      });
    },
    retry: false,
  });
};
