import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RemoveUser } from './RemoveUser';
import type { UserRole } from '../../types/types';
import { usersQueryKeys } from './usersTypes';

export const useRemoveUser = (hoa: number, role: UserRole) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: RemoveUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.hoa(hoa, role),
      });
    },
    retry: false,
  });
};
