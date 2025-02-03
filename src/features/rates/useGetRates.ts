import { useQuery } from '@tanstack/react-query';
import { GetRatesRequest, ratesQueryKeys } from './ratesTypes';
import GetRates from './GetRates';

export const useGetRates = (params: GetRatesRequest) => {
  return useQuery({
    queryKey: ratesQueryKeys.filters(params),
    queryFn: () => GetRates(params),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: params.hoaId > 0,
  });
};
