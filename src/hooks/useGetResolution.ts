import { useQuery } from '@tanstack/react-query';
import type { GetResolutionData, Resolution } from '../types/resolutionTypes';
import GetResolution from '../utils/GetResolution';

export const useGetResolution = ({ id }: GetResolutionData) => {
  return useQuery<Resolution>({
    queryKey: ['xd'],
    // refetchOnMount: false,
    queryFn: () =>
      GetResolution({
        id
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
