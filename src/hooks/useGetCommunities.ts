import { useQuery } from '@tanstack/react-query';
import GetCommunities from '../utils/GetCommunities';

export const useGetCommunities = (isLoggedIn: boolean) => {
  return useQuery({
    queryKey: ['communities'],
    queryFn: GetCommunities,
    staleTime: 1000 * 60 * 60,
    enabled: isLoggedIn
  });
};