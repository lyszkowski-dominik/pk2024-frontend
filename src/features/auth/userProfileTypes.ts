import { ListRequest, UserRole } from '../../types/types';

export type GetUsersRequest = ListRequest & {
  role?: UserRole;
  excludeHoa?: number;
};

export enum Module {
  UserInfo = 'user-info',
  UserSettings = 'user-settings',
  UserHistory = 'user-history',
}

export const userDataQueryKeys = {
  all: ['userData'] as const,
};

export const allUsersQueryKeys = {
  all: ['allUsers'] as const,
  filters: ({ excludeHoa, role }: Partial<GetUsersRequest>) =>
    [
      ...allUsersQueryKeys.all,
      ...(excludeHoa ? ['excludeHoa', `${excludeHoa}`] : []),
      ...(role ? ['role', `${role}`] : []),
    ] as const,
};
