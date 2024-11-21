import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateNewUser } from './CreateNewUser';
import type { UserRole } from '../../types/types';
import { usersQueryKeys } from './usersTypes';

export const useCreateUser = (hoa: number, role: UserRole) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateNewUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.hoa(hoa, role),
      });
    },
    retry: false,
  });
};
