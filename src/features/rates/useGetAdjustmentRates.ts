import { useQuery } from '@tanstack/react-query';
import { ratesAdjustmentQueryKeys } from './ratesTypes';
import GetAdjustmentRates from './GetAdjustmentRates';

export const useGetAdjustmentRates = (hoaId: number, endDate: string) => {
  return useQuery({
    queryKey: ratesAdjustmentQueryKeys.filters({ hoaId, endDate }),
    queryFn: () => GetAdjustmentRates({ hoaId, endDate }),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: hoaId > 0,
  });
};
