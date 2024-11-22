import { useQuery } from '@tanstack/react-query';
import GetResolution from './GetResolution';
import { resolutionsQueryKeys } from './resolutionsTypes';

export const useGetResolution = (id: number) => {
  return useQuery({
    queryKey: resolutionsQueryKeys.details(id),
    queryFn: () => GetResolution(id),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: id > 0,
  });
};
