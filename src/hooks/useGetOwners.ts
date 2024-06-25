import { useQuery } from '@tanstack/react-query';
import GetOwners from '../utils/GetOwners';
import type { GetOwnersData } from '../types/OwnersTypes';

export const useGetOwners = ({
                               role,
                               hoaID,
                               page
                             }: GetOwnersData) => {

  return useQuery({
    queryKey: ['loginCheck'],
    queryFn: () =>
      GetOwners({
        role,
        hoaID,
        page
      }),
    retry: false,
    // staleTime: 1000 * 60 * 60
  });
};