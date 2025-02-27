import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateOwnership } from './CreateOwnership';
import { ownershipsQueryKeys } from './ownershipTypes';

export const useCreateOwnership = (propertyId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateOwnership,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ownershipsQueryKeys.filters({ propertyId }),
      });
    },
    retry: false,
  });
};
