import { useQuery } from '@tanstack/react-query';
import GetMeters from './GetMeters';
import { GetMetersRequest } from '../metersApiTypes';
import { metersQueryKeys } from './metersUtils';

export const useGetMeters = (params: GetMetersRequest) => {
  return useQuery({
    queryKey: metersQueryKeys.filters(params),
    queryFn: () => GetMeters(params),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
