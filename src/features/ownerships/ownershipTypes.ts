import { ListRequest } from '../../types/types';
import type { User } from '../users/usersTypes';

export interface IOwnership {
  id: number;
  owners: Partial<User> & Required<Pick<User, 'id'>>[];
  start: string;
  end: string;
  property: number;
}

export type OwnershipsRequest = ListRequest & {
  propertyId: number;
};
