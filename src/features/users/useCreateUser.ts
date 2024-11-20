import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateNewUser } from './CreateNewUser';
import { getUsersKeys } from './useGetUsers';
import type { UserRole } from '../../types/types';

export const useCreateUser = (hoa: number, role: UserRole) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateNewUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUsersKeys.specific(hoa, role),
      });
    },
    retry: false,
  });
};
