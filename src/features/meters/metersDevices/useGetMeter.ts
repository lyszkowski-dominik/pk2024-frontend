import { useQuery } from '@tanstack/react-query';
import GetMeterById from './GetMeterById';
import { metersQueryKeys } from './metersUtils';

export const useGetMeter = (id: number) => {
  return useQuery({
    queryKey: metersQueryKeys.details(id),
    queryFn: () => GetMeterById(id),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: id > 0,
  });
};
