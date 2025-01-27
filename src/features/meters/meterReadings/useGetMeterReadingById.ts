import { useQuery } from '@tanstack/react-query';
import { metersReadingsQueryKeys } from './meterReadingsTypes';
import GetMeterReadingById from './GetMeterReadingById';

export const useGetMeterReadingById = (id: number) => {
  return useQuery({
    queryKey: metersReadingsQueryKeys.details(id),
    queryFn: () => GetMeterReadingById(id),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: id > 0,
  });
};
