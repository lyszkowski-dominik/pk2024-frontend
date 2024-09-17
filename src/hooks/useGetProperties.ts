import { useQuery } from '@tanstack/react-query';
import type { PropertiesRequest } from '../types/propertiesTypes';
import GetProperties from '../utils/GetProperties';

export const useGetProperties = ({ page, pageSize, hoaId }: PropertiesRequest) => {

  return useQuery({
    queryKey: ['loginCheck'],
    queryFn: () =>
      GetProperties({
        page,
        pageSize,
        hoaId
      }),
    retry: false,
    staleTime: 1000 * 60 * 60
  });
};