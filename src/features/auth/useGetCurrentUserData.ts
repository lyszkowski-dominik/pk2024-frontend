import { useQuery } from '@tanstack/react-query';
import { GetCurrentUserData } from './GetCurrentUserData';
import { userDataQueryKeys } from './userProfileTypes';

export const useGetCurrentUserData = () => {
  return useQuery({
    queryKey: userDataQueryKeys.all,
    queryFn: () => GetCurrentUserData(),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
