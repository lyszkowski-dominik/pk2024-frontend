import { useQuery } from '@tanstack/react-query';
import fetchAllRates from './fetchAllRates';
import { RatesRequest } from './ratesTypes';

export const useGetOldRates = ({ hoaId, page, pageSize, onlyOld }: RatesRequest) => {
  return useQuery({
    queryKey: ['old-rates', hoaId],
    queryFn: () =>
      fetchAllRates({
        hoaId,
        page,
        pageSize,
        onlyOld,
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: hoaId > 0,
  });
};