import { useMutation, useQueryClient } from '@tanstack/react-query';
import GenerateAdjustments from './GenerateAdjustments';
import { adjustmentsQueryKeys } from './adjustmentsTypes';

export const useGenerateAdjustments = (hoaId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: GenerateAdjustments,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adjustmentsQueryKeys.filters({ hoaId }),
      });
    },
    retry: false,
  });
};
