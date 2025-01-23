import { useMutation, useQueryClient } from '@tanstack/react-query';
import { propertiesQueryKeys } from './propertiesTypes';
import DeleteProperty from './DeleteProperty';

export const useDeleteProperty = (hoaId: number, parentId?: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: propertiesQueryKeys.filters({ hoaId }),
      });
      if (parentId) {
        queryClient.invalidateQueries({
          queryKey: propertiesQueryKeys.details(parentId),
        });
      }
    },
    retry: false,
  });
};
