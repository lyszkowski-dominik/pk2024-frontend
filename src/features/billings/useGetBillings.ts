import { useQuery } from '@tanstack/react-query';
import GetBillings from './GetBillings';
import { billingsQueryKeys, GetBillingsRequest } from './billingTypes';

export const useGetBillings = (params: GetBillingsRequest) => {
  return useQuery({
    queryKey: billingsQueryKeys.filters(params),
    queryFn: () => GetBillings(params),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled:
      (params.hoaId && params.hoaId > 0) ||
      (params.propertyId && params?.propertyId > 0) ||
      false,
  });
};
