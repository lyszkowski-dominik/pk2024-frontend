import { useQuery } from '@tanstack/react-query';
import GetResolution from './GetResolution';

export const getResolutionKeys = {
  all: ['getResolution'] as const,
  specific: (id: number) => [...getResolutionKeys.all, `${id}`] as const,
};

export const useGetResolution = (id: number) => {
  return useQuery({
    queryKey: getResolutionKeys.specific(id),
    queryFn: () => GetResolution(id),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
