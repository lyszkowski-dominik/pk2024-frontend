import { useQuery } from '@tanstack/react-query';
import GetBuildings from './GetBuildings';
import { PropertiesRequest } from './propertiesTypes';

export const useGetBuildings = ({
  page,
  pageSize,
  hoaId,
}: PropertiesRequest) => {
  return useQuery({
    queryKey: ['all-buildings'],
    queryFn: () =>
      GetBuildings({
        page,
        pageSize,
        hoaId,
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: hoaId > 0,
  });
};
