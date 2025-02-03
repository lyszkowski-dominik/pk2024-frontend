import { ListRequest } from '../../types/types';
import type { User } from '../users/usersTypes';

export type Ownership = {
  id: number;
  owners: Partial<User>[];
  start: string;
  end: string;
  property: number;
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
