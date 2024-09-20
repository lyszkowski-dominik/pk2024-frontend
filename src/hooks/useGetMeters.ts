import { useQuery } from '@tanstack/react-query';
import GetMeters from '../utils/GetMeters';

export const useGetMeters = () => {
  return useQuery({
    queryKey: ['getMeters'],
    queryFn: () => GetMeters(),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
