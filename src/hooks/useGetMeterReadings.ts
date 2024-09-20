import { useQuery } from '@tanstack/react-query';
import type { PropertiesRequest } from '../types/propertiesTypes';
import GetMeterReadings from '../utils/GetMeterReadings';

export const useGetMeterReadings = ({
  page,
  pageSize,
  propertyId,
}: PropertiesRequest) => {
  return useQuery({
    queryKey: ['getMeterReadings'],
    queryFn: () =>
      GetMeterReadings({
        page,
        pageSize,
        propertyId,
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
