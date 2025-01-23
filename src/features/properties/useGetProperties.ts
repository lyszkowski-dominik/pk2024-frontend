import { useQuery } from '@tanstack/react-query';
import { propertiesQueryKeys, type PropertiesRequest } from './propertiesTypes';
import GetProperties from './GetProperties';

export const useGetProperties = ({
  page,
  pageSize,
  hoaId,
}: PropertiesRequest) => {
  return useQuery({
    queryKey: propertiesQueryKeys.filters({ hoaId }),
    queryFn: () =>
      GetProperties({
        page,
        pageSize,
        hoaId,
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: hoaId > 0,
  });
};
