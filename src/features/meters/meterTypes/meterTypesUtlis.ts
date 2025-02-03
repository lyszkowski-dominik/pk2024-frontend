import { GetMeterTypesRequest } from '../metersApiTypes';

export const meterTypesQueryKeys = {
  all: ['meterTypes'] as const,
  filters: ({ hoaId, isActive }: Partial<GetMeterTypesRequest>) =>
    [
      ...meterTypesQueryKeys.all,
      ...(hoaId ? ['hoa', `${hoaId}`] : []),
      ...(isActive !== undefined ? ['active', `${isActive}`] : []),
    ] as const,
  details: (id: number) =>
    [...meterTypesQueryKeys.all, 'details', `${id}`] as const,
};

export enum CalculatingMethod {
  NUMER_OF_PERSONS = 'number_of_persons',
  LOCAL = 'local',
  TOTAL_FLOOT_AREA = 'total_floor_area',
  USABLE_AREA = 'usable_area',
}

export const calculatingMethodDisplayMap = {
  [CalculatingMethod.NUMER_OF_PERSONS]: 'Ilość osób',
  [CalculatingMethod.LOCAL]: 'Lokal',
  [CalculatingMethod.TOTAL_FLOOT_AREA]: 'Powierzchnia całkowita',
  [CalculatingMethod.USABLE_AREA]: 'Powierzchnia użytkowa',
};

export const calculationMethodOptions = Object.values(CalculatingMethod).map(
  (method) => ({
    key: method,
    value: method,
    label: `${calculatingMethodDisplayMap[method]}`,
  }),
);
