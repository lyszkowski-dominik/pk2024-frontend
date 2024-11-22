import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateProperty } from './CreateProperty';
import { propertiesQueryKeys } from './propertiesTypes';

export const useCreateProperty = (hoa: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: propertiesQueryKeys.hoa(hoa),
      });
    },
    retry: false,
  });
};
