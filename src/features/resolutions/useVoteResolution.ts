import { useMutation, useQueryClient } from '@tanstack/react-query';
import { VoteResolution } from './VoteResolution';
import { resolutionsQueryKeys } from './resolutionsTypes';

export const useVoteResolution = (hoa: number, id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: VoteResolution,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: resolutionsQueryKeys.details(id),
      });
      queryClient.invalidateQueries({
        queryKey: resolutionsQueryKeys.hoa(hoa),
      });
    },
    retry: false,
  });
};
