import { useQuery } from '@tanstack/react-query';
import { ratesQueryKeys } from './ratesTypes';
import { GetRatesById } from './GetRatesById';

export const useGetRatesById = (id: number) => {
  return useQuery({
    queryKey: ratesQueryKeys.details(id),
    queryFn: () => GetRatesById(id),
    retry: false,
    staleTime: 1000 * 60 * 60,
    enabled: id > 0,
  });
};
