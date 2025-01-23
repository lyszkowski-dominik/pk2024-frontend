import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditResolution } from '../resolutions/EditResolution';
import { resolutionsQueryKeys } from '../resolutions/resolutionsTypes';

export const useEditResolution = (hoa: number, id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: EditResolution,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: resolutionsQueryKeys.details(id),
      });
      queryClient.invalidateQueries({
        queryKey: resolutionsQueryKeys.filters({ hoaId: hoa }),
      });
    },
    retry: false,
  });
};
