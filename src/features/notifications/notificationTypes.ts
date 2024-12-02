import { ListRequest } from '../../types/types';

export type GetNotificationsRequest = ListRequest & {
  hoaId: number;
};

export type Notification = {
  id: number;
  message: string;
  description?: string;
  link?: string;
  created_at?: string;
  hoa: number;
};

export const notificationsQueryKeys = {
  all: ['notifications'] as const,
  filters: ({ hoaId, page, pageSize }: Partial<GetNotificationsRequest>) =>
    [
      ...notificationsQueryKeys.all,
      ...(hoaId ? ['hoa', `${hoaId}`] : []),
      ...(page ? ['page', `${page}`] : []),
      ...(pageSize ? ['pageSize', `${pageSize}`] : []),
    ] as const,
  details: (id: number) =>
    [...notificationsQueryKeys.all, 'details', `${id}`] as const,
};
