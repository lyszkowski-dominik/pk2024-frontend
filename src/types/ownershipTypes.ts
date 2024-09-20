import type { User } from './usersTypes';

export interface IOwnership {
  id: number;
  owners: User[];
  start: string;
  end: string;
  property: number;
}
