import { useQuery } from '@tanstack/react-query';
import GetBillingById from '../utils/GetBillingById';

export const useGetBillingById = (id: number) => {
  return useQuery({
    queryKey: ['billing', id],
    queryFn: () => GetBillingById(id),
    staleTime: 1000 * 60 * 60,
    enabled: id !== -1,
  });
};
