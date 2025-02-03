import { useQuery } from '@tanstack/react-query';
import GetMeterReadings from './GetMeterReadings';
import {
  metersReadingsQueryKeys,
  MetersReadingsRequest,
} from './meterReadingsTypes';

export const useGetMeterReadings = (params: MetersReadingsRequest) => {
  return useQuery({
    queryKey: metersReadingsQueryKeys.filters(params),
    queryFn: () => GetMeterReadings(params),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
