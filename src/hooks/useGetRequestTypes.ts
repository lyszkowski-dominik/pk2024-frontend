import { useQuery } from '@tanstack/react-query';
import type { GetRequestTypesData } from '../types/reqeustTypes';
import GetRequestTypes from '../utils/GetRequestTypes';

export const useGetRequestTypes = ({
  hoaID,
  page,
  pageSize,
}: GetRequestTypesData) => {
  return useQuery({
    queryKey: ['getRequestTypes'],
    queryFn: () =>
      GetRequestTypes({
        hoaID,
        page,
        pageSize,
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
