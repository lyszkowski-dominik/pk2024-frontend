import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ownershipsQueryKeys } from './ownershipTypes';
import { ChangeOwnership } from './ChangeOwnership';

export const useChangeOwnership = (propertyId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ChangeOwnership,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ownershipsQueryKeys.filters({ propertyId }),
      });
    },
    retry: false,
  });
};
