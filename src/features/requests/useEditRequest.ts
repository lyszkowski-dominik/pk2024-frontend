import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestsQueryKeys } from './requestTypes';
import { EditRequest } from './EditRequest';

export const useEditRequest = (hoa: number, id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: EditRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: requestsQueryKeys.details(id),
      });
      queryClient.invalidateQueries({
        queryKey: requestsQueryKeys.filters({ hoaId: hoa }),
      });
    },
    retry: false,
  });
};
