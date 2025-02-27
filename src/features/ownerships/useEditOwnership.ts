import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditOwnership } from './EditOwnership';
import { ownershipsQueryKeys } from './ownershipTypes';

export const useEditOwnership = (id: number, propertyId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: EditOwnership,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ownershipsQueryKeys.details(id),
      });
      queryClient.invalidateQueries({
        queryKey: ownershipsQueryKeys.filters({ propertyId }),
      });
    },
    retry: false,
  });
};
