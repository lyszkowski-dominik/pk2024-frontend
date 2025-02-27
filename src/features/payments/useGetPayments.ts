import { useQuery } from '@tanstack/react-query';
import GetPayments from './GetPayments';
import { GetPaymentsRequest, paymentsQueryKeys } from './paymentsTypes';

export const useGetPayments = (params: GetPaymentsRequest) => {
  return useQuery({
    queryKey: paymentsQueryKeys.filters(params),
    queryFn: () => GetPayments(params),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled:
      (params.hoaId && params.hoaId > 0) ||
      (params.propertyId && params?.propertyId > 0) ||
      false,
  });
};
