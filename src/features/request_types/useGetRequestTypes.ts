import { useQuery } from '@tanstack/react-query';
import GetRequestTypes from './GetRequestTypes';
import {
  GetRequestTypesData,
  requestsQueryKeys,
} from '../requests/requestTypes';

export const useGetRequestTypes = (params: GetRequestTypesData) => {
  return useQuery({
    queryKey: requestsQueryKeys.requestsTypes,
    queryFn: () => GetRequestTypes(params),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
