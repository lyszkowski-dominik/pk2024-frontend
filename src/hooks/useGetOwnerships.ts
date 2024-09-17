import { useQuery } from '@tanstack/react-query';
import type { PropertiesRequest } from '../types/propertiesTypes';
import GetOwnerships from '../utils/GetOwnerships';

export const useGetOwnerships = ({ page, pageSize }: PropertiesRequest) => {
  return useQuery({
    queryKey: ['getOwnerships'],
    queryFn: () =>
      GetOwnerships({
        page,
        pageSize,
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
