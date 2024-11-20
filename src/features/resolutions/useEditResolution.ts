import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getResolutionsKeys } from './useGetResolutions';
import { EditResolution } from './EditResolution';

export const useEditResolution = (hoa: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: EditResolution,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getResolutionsKeys.specific(hoa),
      });
    },
    retry: false,
  });
};
