import type { User } from '../users/usersTypes';

export interface IOwnership {
  id: number;
  owners: User[];
  start: string;
  end: string;
  property: number;
}
