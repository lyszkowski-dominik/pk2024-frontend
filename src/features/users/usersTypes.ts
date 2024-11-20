import type { ListRequest, UserRole } from '../../types/types';

export type GetUsersRequest = ListRequest & {
  role: UserRole;
  hoaId: number;
};

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type UsersResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
};
