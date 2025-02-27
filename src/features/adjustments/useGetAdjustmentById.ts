import { useQuery } from '@tanstack/react-query';
import { adjustmentsQueryKeys } from './adjustmentsTypes';
import GetAdjustmentById from './GetAdjustmentById';

export const useGetAdjustmentById = (id: number) => {
  return useQuery({
    queryKey: adjustmentsQueryKeys.details(id),
    queryFn: () => GetAdjustmentById(id),
    staleTime: 1000 * 60 * 60,
    enabled: id > 0,
  });
};
