import { useQuery } from '@tanstack/react-query';
import { GetUserData } from './GetUserData';
import { userDataQueryKeys } from './userProfileTypes';

export const useGetUserData = () => {
  return useQuery({
    queryKey: userDataQueryKeys.all,
    queryFn: () => GetUserData(),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
