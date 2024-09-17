import { useQuery } from '@tanstack/react-query';
import GetCommunityById from '../utils/GetCommunityById';

export const useGetCommunityById = (id: string) => {
  return useQuery({
    queryKey: ['community', id],
    queryFn: () => GetCommunityById(id),
    staleTime: 1000 * 60 * 60,
    enabled: id !== ''
  });
};