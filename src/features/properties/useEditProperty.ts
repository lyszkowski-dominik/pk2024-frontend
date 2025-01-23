import { useMutation, useQueryClient } from '@tanstack/react-query';
import { propertiesQueryKeys } from './propertiesTypes';
import { EditProperty } from './EditProperty';

export const useEditProperty = (
  hoaId: number,
  id?: number | null,
  parentId?: number | null,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: EditProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: propertiesQueryKeys.filters({ hoaId }),
      });
      if (id) {
        queryClient.invalidateQueries({
          queryKey: propertiesQueryKeys.details(id),
        });
      }
      if (parentId) {
        queryClient.invalidateQueries({
          queryKey: propertiesQueryKeys.details(parentId),
        });
      }
    },
    retry: false,
  });
};
