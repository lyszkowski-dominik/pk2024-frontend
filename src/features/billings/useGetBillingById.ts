import { useQuery } from '@tanstack/react-query';
import GetBillingById from '../../features/billings/GetBillingById';
import { billingsQueryKeys } from './billingTypes';

export const useGetBillingById = (id: number) => {
  return useQuery({
    queryKey: billingsQueryKeys.details(id),
    queryFn: () => GetBillingById(id),
    staleTime: 1000 * 60 * 60,
    enabled: id > 0,
  });
};
