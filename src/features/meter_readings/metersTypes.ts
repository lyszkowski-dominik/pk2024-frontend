import { ListRequest } from '../../types/types';

export const metersReadingsQueryKeys = {
  all: ['metersReadings'] as const,
  filters: ({
    propertyId,
    page,
    pageSize,
    meterId,
  }: Partial<MetersReadingsRequest>) =>
    [
      ...metersReadingsQueryKeys.all,
      ...(propertyId ? ['property', `${propertyId}`] : []),
      ...(meterId ? ['meter', `${meterId}`] : []),
      ...(page ? ['page', `${page}`] : []),
      ...(pageSize ? ['pageSize', `${pageSize}`] : []),
    ] as const,
  details: (id: number) =>
    [...metersReadingsQueryKeys.all, 'details', `${id}`] as const,
};

export type MetersReadingsRequest = ListRequest & {
  propertyId: number;
  meterId: number;
};
