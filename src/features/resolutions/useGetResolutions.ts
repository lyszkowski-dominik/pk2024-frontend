import { useQuery } from '@tanstack/react-query';
import { GetResolutionsRequest } from './resolutionsTypes';
import GetResolutions from './GetResolutions';

export const getResolutionsKeys = {
  all: ['getResolutions'] as const,
  specific: (hoa: number) => [...getResolutionsKeys.all, `${hoa}`] as const,
};

export const useGetResolutions = (params: GetResolutionsRequest) => {
  return useQuery({
    queryKey: getResolutionsKeys.specific(params.hoaId),
    queryFn: () => GetResolutions(params),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: params.hoaId > 0,
  });
};
