import { useQuery } from '@tanstack/react-query';
import type { PropertiesRequest } from '../properties/propertiesTypes';
import GetMeterReadings from './GetMeterReadings';

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
