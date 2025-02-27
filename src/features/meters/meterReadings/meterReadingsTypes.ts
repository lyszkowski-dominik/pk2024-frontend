import { ListRequest } from '../../../types/types';

export const metersReadingsQueryKeys = {
  all: ['metersReadings'] as const,
  filters: ({
    propertyId,
    meterId,
    hoaId,
    page,
  }: Partial<MetersReadingsRequest>) =>
    [
      ...metersReadingsQueryKeys.all,
      ...(hoaId ? ['hoa', `${hoaId}`] : []),
      ...(propertyId ? ['property', `${propertyId}`] : []),
      ...(meterId ? ['meter', `${meterId}`] : []),
      ...(page ? ['page', `${page}`] : []),
    ] as const,
  details: (id: number) =>
    [...metersReadingsQueryKeys.all, 'details', `${id}`] as const,
};

export type MetersReadingsRequest = ListRequest & {
  hoaId?: number;
  propertyId?: number;
  meterId?: number;
};
