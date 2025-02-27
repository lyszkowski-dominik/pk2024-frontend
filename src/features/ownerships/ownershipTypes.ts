import { ListRequest } from '../../types/types';
import { MeterReading } from '../meters/metersApiTypes';
import type { User } from '../users/usersTypes';

export type Ownership = {
  id: number;
  owners: Partial<User>[];
  start: string;
  end: string;
  property: number;
  balance: number;
};

export type OwnershipChangeForm = {
  owners: Partial<User>[];
  meter_readings: Partial<MeterReading>[];
  date: string;
  inhabitants: number;
};

export const ownershipsQueryKeys = {
  all: ['ownerships'] as const,
  filters: ({ propertyId, hoaId }: Partial<OwnershipsRequest>) =>
    [
      ...ownershipsQueryKeys.all,
      ...(hoaId ? ['hoa', `${hoaId}`] : []),
      ...(propertyId ? ['property', `${propertyId}`] : []),
    ] as const,
  details: (id: number) =>
    [...ownershipsQueryKeys.all, 'details', `${id}`] as const,
};

export type OwnershipsRequest = ListRequest & {
  propertyId: number;
  hoaId?: number;
};
