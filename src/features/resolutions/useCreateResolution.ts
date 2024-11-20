import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateResolution } from './CreateResolution';
import { getResolutionsKeys } from './useGetResolutions';

export const useCreateResolution = (hoa: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateResolution,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getResolutionsKeys.specific(hoa),
      });
    },
    retry: false,
  });
};
