import { useMutation, useQueryClient } from '@tanstack/react-query';
import { VoteResolution } from './VoteResolution';
import { getResolutionKeys } from './useGetResolution';
import { getResolutionsKeys } from './useGetResolutions';

export const useVoteResolution = (hoa: number, id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: VoteResolution,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getResolutionKeys.specific(id),
      });
      queryClient.invalidateQueries({
        queryKey: getResolutionsKeys.specific(hoa),
      });
    },
    retry: false,
  });
};
