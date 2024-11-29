import { useQuery } from '@tanstack/react-query';
import {
  GetResolutionsRequest,
  resolutionsQueryKeys,
} from './resolutionsTypes';
import GetResolutions from './GetResolutions';

export const useGetResolutions = (params: GetResolutionsRequest) => {
  return useQuery({
    queryKey: [
      ...resolutionsQueryKeys.hoa(params.hoaId),
      ...resolutionsQueryKeys.page(params.page, params.pageSize),
    ],
    queryFn: () => GetResolutions(params),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: params.hoaId > 0,
  });
};
