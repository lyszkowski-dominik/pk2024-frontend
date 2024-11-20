import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsersKeys } from './useGetUsers';
import type { UserRole } from '../../types/types';
import AddExistingUser from './AddExistingUser';

export const useAddExistingUser = (hoa: number, role: UserRole) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AddExistingUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUsersKeys.specific(hoa, role),
      });
    },
    retry: false,
  });
};
