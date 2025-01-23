import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateProperty } from './CreateProperty';
import { propertiesQueryKeys } from './propertiesTypes';

export const useCreateProperty = (hoaId: number, parentId?: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateProperty,
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
