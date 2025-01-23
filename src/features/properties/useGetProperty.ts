import { useQuery } from '@tanstack/react-query';
import { propertiesQueryKeys } from './propertiesTypes';
import GetProperty from './GetProperty';

export const useGetProperty = (id: number) => {
  return useQuery({
    queryKey: propertiesQueryKeys.details(id),
    queryFn: () => GetProperty(id),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: id > 0,
  });
};
