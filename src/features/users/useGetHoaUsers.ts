import { useQuery } from '@tanstack/react-query';
import { usersQueryKeys, type GetHoaUsersRequest } from './usersTypes';
import GetHoaUsers from './GetHoaUsers';

export const useGetHoaUsers = (params: GetHoaUsersRequest) => {
  return useQuery({
    queryKey: usersQueryKeys.filters(params),
    queryFn: () => GetHoaUsers(params),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: params.hoaId > 0,
  });
};
