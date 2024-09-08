import { useQuery } from '@tanstack/react-query';
import type { GetResolutionsData } from '../types/resolutionTypes';
import GetResolutions from '../utils/GetResolutions';

export const useGetResolutions = ({ hoaID, page, pageSize }: GetResolutionsData) => {
  return useQuery({
    queryKey: ['xd'],
    refetchOnMount: false,
    enabled: false,
    queryFn: () =>
      GetResolutions({
        hoaID,
        page,
        pageSize
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
