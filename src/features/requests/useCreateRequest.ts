import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateRequest } from './CreateRequest';
import { requestsQueryKeys, RequestState } from './requestTypes';

export const useCreateRequest = (hoa: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: requestsQueryKeys.filters({
          hoaId: hoa,
          states: [RequestState.new],
        }),
      });
    },
    retry: false,
  });
};
