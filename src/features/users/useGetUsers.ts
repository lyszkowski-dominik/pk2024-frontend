import { useQuery } from '@tanstack/react-query';
import { usersQueryKeys, type GetUsersRequest } from './usersTypes';
import GetUsers from './GetUsers';

export const useGetUsers = ({
  role,
  hoaId,
  page,
  pageSize,
}: GetUsersRequest) => {
  return useQuery({
    queryKey: usersQueryKeys.hoa(hoaId, role),
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
