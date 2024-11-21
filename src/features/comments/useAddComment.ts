import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddComment } from './AddComment';
import { requestsQueryKeys } from '../requests/requestTypes';

export const useAddComment = (requestId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AddComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: requestsQueryKeys.details(requestId),
      });
    },
    retry: false,
  });
};
