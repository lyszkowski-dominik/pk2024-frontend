import { useQuery } from '@tanstack/react-query';
import { paymentsQueryKeys } from './paymentsTypes';
import GetPaymentById from './GetPaymentById';

export const useGetPaymentById = (id: number) => {
  return useQuery({
    queryKey: paymentsQueryKeys.details(id),
    queryFn: () => GetPaymentById(id),
    staleTime: 1000 * 60 * 60,
    enabled: id > 0,
  });
};
