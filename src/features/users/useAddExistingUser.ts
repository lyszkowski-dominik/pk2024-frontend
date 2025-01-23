import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UserRole } from '../../types/types';
import AddExistingUser from './AddExistingUser';
import { usersQueryKeys } from './usersTypes';

export const useAddExistingUser = (hoa: number, role: UserRole) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AddExistingUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.filters({ hoaId: hoa, role }),
      });
    },
    retry: false,
  });
};
