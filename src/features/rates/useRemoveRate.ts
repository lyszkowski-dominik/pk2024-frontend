import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RemoveRate } from './RemoveRate';

export const useRemoveRate = (hoa: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: RemoveRate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['rates', hoa],
      });
    },
    retry: false,
  });
};
