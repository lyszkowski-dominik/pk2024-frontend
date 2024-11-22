import { useQuery } from '@tanstack/react-query';
import { getQueryKey, type GetRequestsData } from './requestTypes';
import GetRequests from './GetRequests';

export const useGetRequests = (params: GetRequestsData) => {
  return useQuery({
    queryKey: getQueryKey({ ...params }),
    queryFn: () => GetRequests(params),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: params.hoaId > 0,
  });
};
