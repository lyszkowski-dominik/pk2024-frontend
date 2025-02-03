import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateOwnership } from './CreateOwnership';
import { ownershipsQueryKeys } from './ownershipTypes';

export const useCreateOwnership = (hoaId: number, propertyId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateOwnership,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ownershipsQueryKeys.filters({ hoaId, propertyId }),
      });
    },
    retry: false,
  });
};
