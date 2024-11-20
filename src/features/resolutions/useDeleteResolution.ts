import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteResolution } from './DeleteResolution';
import { getResolutionsKeys } from './useGetResolutions';

export const useDeleteResolution = (hoa: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteResolution,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getResolutionsKeys.specific(hoa),
      });
    },
    retry: false,
  });
};
