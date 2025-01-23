import { useQuery } from '@tanstack/react-query';
import GetMeterReadings from './GetMeterReadings';
import { metersReadingsQueryKeys, MetersReadingsRequest } from './metersTypes';

export const useGetMeterReadings = ({
  page,
  pageSize,
  propertyId,
  meterId,
}: MetersReadingsRequest) => {
  return useQuery({
    queryKey: metersReadingsQueryKeys.filters({
      propertyId,
      page,
      pageSize,
      meterId,
    }),
    queryFn: () =>
      GetMeterReadings({
        page,
        pageSize,
        propertyId,
        meterId,
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
