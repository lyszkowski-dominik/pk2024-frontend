import { useQuery } from '@tanstack/react-query';
import { GetMeterTypesRequest } from '../metersApiTypes';
import { meterTypesQueryKeys } from './meterTypesUtlis';
import GetMeterTypes from './GetMeterTypes';

export const useGetMeterTypes = (params: GetMeterTypesRequest) => {
  return useQuery({
    queryKey: meterTypesQueryKeys.filters(params),
    queryFn: () => GetMeterTypes(params),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: params.hoaId > 0,
  });
};
