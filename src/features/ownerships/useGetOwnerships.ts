import { useQuery } from '@tanstack/react-query';
import GetOwnerships from './GetOwnerships';
import { ownershipsQueryKeys, OwnershipsRequest } from './ownershipTypes';

export const useGetOwnerships = (params: OwnershipsRequest) => {
  return useQuery({
    queryKey: ownershipsQueryKeys.filters(params),
    queryFn: () => GetOwnerships(params),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
