import { GetMetersRequest } from '../metersApiTypes';

export const metersQueryKeys = {
  all: ['meters'] as const,
  filters: ({
    hoaId,
    propertyId,
    isActive,
    meterType,
  }: Partial<GetMetersRequest>) =>
    [
      ...metersQueryKeys.all,
      ...(hoaId ? ['hoa', `${hoaId}`] : []),
      ...(propertyId ? ['property', `${propertyId}`] : []),
      ...(isActive !== undefined ? ['active', `${isActive}`] : []),
      ...(meterType! ? ['type', `${meterType}`] : []),
    ] as const,
  details: (id: number) =>
    [...metersQueryKeys.all, 'details', `${id}`] as const,
};
