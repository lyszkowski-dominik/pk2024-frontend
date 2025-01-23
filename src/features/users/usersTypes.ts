import type { ListRequest, UserRole } from '../../types/types';

export type GetHoaUsersRequest = ListRequest & {
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

export const usersQueryKeys = {
  all: ['users'] as const,
  filters: ({ hoaId, role, page, pageSize }: Partial<GetHoaUsersRequest>) =>
    [
      ...usersQueryKeys.all,
      ...(hoaId ? ['hoa', `${hoaId}`] : []),
      ...(role ? ['role', `${role}`] : []),
      ...(page ? ['page', `${page}`] : []),
      ...(pageSize ? ['pageSize', `${pageSize}`] : []),
    ] as const,
};
