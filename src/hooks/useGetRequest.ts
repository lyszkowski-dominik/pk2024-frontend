import { useQuery } from '@tanstack/react-query';
import type { GetRequestData, Request } from '../types/reqeustTypes';
import GetRequest from '../utils/GetRequest';

export const useGetRequest = ({ id }: GetRequestData) => {
  return useQuery<Request>({
    queryKey: ['getRequest'],
    queryFn: () =>
      GetRequest({
        id,
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
