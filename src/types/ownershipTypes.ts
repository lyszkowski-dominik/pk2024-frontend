import type { Owner } from './OwnersTypes';

export interface IOwnership {
  id: number;
  owners: Owner[];
  start: string;
  end: string;
  property: number;
}
