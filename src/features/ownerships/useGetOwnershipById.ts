import { useQuery } from '@tanstack/react-query';
import { ownershipsQueryKeys } from './ownershipTypes';
import GetOwnershipById from './GetOwnershipById';

export const useGetOwnership = (id: number) => {
  return useQuery({
    queryKey: ownershipsQueryKeys.details(id),
    queryFn: () => GetOwnershipById(id),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: id > 0,
  });
};
