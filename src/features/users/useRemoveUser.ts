import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsersKeys } from './useGetUsers';
import { RemoveUser } from './RemoveUser';
import type { UserRole } from '../../types/types';

export const useRemoveUser = (hoa: number, role: UserRole) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: RemoveUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUsersKeys.specific(hoa, role),
      });
    },
    retry: false,
  });
};
