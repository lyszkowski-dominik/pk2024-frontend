import type { User } from './OwnersTypes';

export interface IOwnership {
  id: number;
  owners: User[];
  start: string;
  end: string;
  property: number;
}
