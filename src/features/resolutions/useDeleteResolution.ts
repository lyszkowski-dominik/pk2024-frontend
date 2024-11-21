import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteResolution } from './DeleteResolution';
import { resolutionsQueryKeys } from './resolutionsTypes';

export const useDeleteResolution = (hoa: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteResolution,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: resolutionsQueryKeys.hoa(hoa),
      });
    },
    retry: false,
  });
};
