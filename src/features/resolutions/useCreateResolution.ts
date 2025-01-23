import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateResolution } from './CreateResolution';
import { resolutionsQueryKeys } from './resolutionsTypes';

export const useCreateResolution = (hoa: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateResolution,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: resolutionsQueryKeys.filters({ hoaId: hoa }),
      });
    },
    retry: false,
  });
};
