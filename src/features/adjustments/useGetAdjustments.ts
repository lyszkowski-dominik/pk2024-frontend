import { useQuery } from '@tanstack/react-query';
import {
  adjustmentsQueryKeys,
  GetAdjustmentsRequest,
} from './adjustmentsTypes';
import GetAdjustments from './GetAdjustments';

export const useGetAdjustments = (params: GetAdjustmentsRequest) => {
  return useQuery({
    queryKey: adjustmentsQueryKeys.filters(params),
    queryFn: () => GetAdjustments(params),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled:
      (params.hoaId && params.hoaId > 0) ||
      (params.propertyId && params?.propertyId > 0) ||
      false,
  });
};
