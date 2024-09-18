import { useQuery } from '@tanstack/react-query';
import type { GetRequestsData } from '../types/reqeustTypes';
import GetRequests from '../utils/GetRequests';

export const useGetRequests = ({
  hoaID,
  page,
  pageSize,
  state,
  assignedToMe,
  queryKey
}: GetRequestsData) => {
  return useQuery({
    queryKey: ['getRequests', queryKey],
    queryFn: () =>
      GetRequests({
        hoaID,
        page,
        pageSize,
        state,
        assignedToMe
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
