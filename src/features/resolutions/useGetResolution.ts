import { useQuery } from '@tanstack/react-query';
import type { GetResolutionData, Resolution } from './resolutionTypes';
import GetResolution from '../../features/resolutions/GetResolution';

/**
 * 
 * @param {GetResolutionData} - The `useGetResolution` function fetches resolution data by ID using a query with caching enabled.
 * @remarks
 * queryKey: ['xd'] - The `queryKey` is an array that specifies the query key for easy refetching.
 * queryFn: () => GetResolution({ id }) - The `queryFn` is a function that fetches resolution data by ID.
 * retry: false - The `retry` option ensures that the query is not retried on error.
 * staleTime: 1000 * 60 * 60 - The `staleTime` is set to 1 hour (60 minutes * 60 seconds).
 * @returns the result of the useGetResolution hook.
 */
export const useGetResolution = ({ id }: GetResolutionData) => {
  return useQuery<Resolution>({
    queryKey: ['xd'],
    // refetchOnMount: false,
    queryFn: () =>
      GetResolution({
        id
      }),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
