import { useQuery } from '@tanstack/react-query';
import { adjustmentsDatesQueryKeys } from './adjustmentsTypes';
import GetAdjustmentsDates from './GetAdjustmentsDates';

export const useGetAdjustmentsDates = (hoaId: number) => {
  return useQuery({
    queryKey: adjustmentsDatesQueryKeys.filters({ hoaId }),
    queryFn: () => GetAdjustmentsDates({ hoaId }),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: (hoaId && hoaId > 0) || false,
  });
};
