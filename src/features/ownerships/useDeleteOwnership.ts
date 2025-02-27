import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ownershipsQueryKeys } from './ownershipTypes';
import { DeleteOwnership } from './DeleteOwnership';

export const useDeleteOwnership = (propertyId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteOwnership,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ownershipsQueryKeys.filters({ propertyId }),
      });
    },
    retry: false,
  });
};
