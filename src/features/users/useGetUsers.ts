import { useQuery } from '@tanstack/react-query';
import type { GetUsersRequest } from './usersTypes';
import GetUsers from './GetUsers';
import type { UserRole } from '../../types/types';

export const getUsersKeys = {
  all: ['getUsers'] as const,
  specific: (hoa: number, role: UserRole) =>
    [...getUsersKeys.all, `${hoa}`, `${role}`] as const,
};

export const useGetUsers = ({
  role,
  hoaId,
  page,
  pageSize,
}: GetUsersRequest) => {
  return useQuery({
    queryKey: getUsersKeys.specific(hoaId, role),
    queryFn: () =>
      GetUsers({
        role,
        hoaId,
        page,
        pageSize,
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: hoaId > 0,
  });
};
