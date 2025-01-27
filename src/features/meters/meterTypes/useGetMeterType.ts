import { useQuery } from '@tanstack/react-query';
import { meterTypesQueryKeys } from './meterTypesUtlis';
import GetMeterType from './GetMeterType';

export const useGetMeterType = (id: number) => {
  return useQuery({
    queryKey: meterTypesQueryKeys.details(id),
    queryFn: () => GetMeterType(id),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: id > 0,
  });
};
