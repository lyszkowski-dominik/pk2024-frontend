import { useQuery } from '@tanstack/react-query';
import type { ListRequest } from '../types/types';
import GetBillings from '../utils/GetBillings';

export const useGetBillings = ({ page, pageSize }: ListRequest) => {
  return useQuery({
    queryKey: ['useGetBillings'],
    queryFn: () =>
      GetBillings({
        page,
        pageSize,
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
