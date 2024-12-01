import { useQuery } from '@tanstack/react-query';
import { allUsersQueryKeys, GetUsersRequest } from './userProfileTypes';
import GetUsers from './GetUsers';

export const useGetUsers = (params: GetUsersRequest) => {
  return useQuery({
    queryKey: allUsersQueryKeys.filters(params),
    queryFn: () => GetUsers(params),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
