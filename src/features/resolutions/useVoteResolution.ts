import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resolutionsQueryKeys } from './resolutionsTypes';
import VoteResolution from './VoteResolution';

export const useVoteResolution = (hoa: number, id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: VoteResolution,
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
