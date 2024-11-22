import { useQuery } from '@tanstack/react-query';
import GetRequest from './GetRequest';
import { requestsQueryKeys } from './requestTypes';

export const useGetRequest = (id: number) => {
  return useQuery({
    queryKey: requestsQueryKeys.details(id),
    queryFn: () => GetRequest(id),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: id > 0,
  });
};
