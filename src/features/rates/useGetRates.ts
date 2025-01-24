import { useQuery } from '@tanstack/react-query';
import fetchAllRates from './fetchAllRates';
import { RatesRequest } from './ratesTypes';

export const useGetRates = ({ hoaId, page, pageSize }: RatesRequest) => {
  return useQuery({
    queryKey: ['rates', hoaId],
    queryFn: () =>
      fetchAllRates({
        hoaId,
        page,
        pageSize,
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: hoaId > 0,
  });
};