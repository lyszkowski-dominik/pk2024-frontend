import { useQuery } from '@tanstack/react-query';
import GetRequestTypes from './GetRequestTypes';
import {
  GetRequestTypesData,
  requestTypesQueryKeys,
} from '../requests/requestTypes';

export const useGetRequestTypes = (params: GetRequestTypesData) => {
  return useQuery({
    queryKey: requestTypesQueryKeys.filters(params),
    queryFn: () => GetRequestTypes(params),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
