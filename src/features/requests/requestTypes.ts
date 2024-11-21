import { ListRequest } from '../../types/types';

export type GetRequestsData = ListRequest & {
  hoaId: number;
  state?: RequestState;
  assignedToMe?: boolean;
};

export type GetRequestTypesData = ListRequest & {
  hoaId: number;
};

export type GetRequestData = {
  id: number;
};

export type Comment = {
  id: number;
  hoa: number;
  author_name: string;
  created: string | Date;
  created_by: number;
  request: number;
  text: string;
};

export type Request = {
  id: number;
  hoa: number;
  title: string;
  description: string;
  created: string | Date;
  created_by: {
    id: number;
    name: string;
    email: string;
  };
  assigned_to: {
    id: number;
    name: string;
    email: string;
  };
  state: RequestState;
  notes: string;
  type: RequestType;
  comments: Comment[];
};

export type RequestType = {
  id: number;
  hoa?: number;
  title?: string;
  description?: string;
};

export enum RequestState {
  new = 'new',
  work_in_progress = 'work_in_progress',
  pending = 'pending',
  resolved = 'resolved',
  closed = 'closed',
  cancelled = 'cancelled',
}

export const stateDisplayMap = {
  [RequestState.new]: 'Nowe',
  [RequestState.work_in_progress]: 'W trakcie',
  [RequestState.pending]: 'Oczekujące',
  [RequestState.resolved]: 'Rozwiązane',
  [RequestState.closed]: 'Zamknięte',
  [RequestState.cancelled]: 'Anulowane',
};

export const requestsQueryKeys = {
  all: ['requests'] as const,
  requestsTypes: ['requestsTypes'] as const,
  hoa: (hoa: number) => [...requestsQueryKeys.all, 'hoa', `${hoa}`] as const,
  state: (hoa: number, state: RequestState) =>
    [...requestsQueryKeys.hoa(hoa), 'state', `${state}`] as const,
  assigned: (hoa: number, assignedToMe: boolean) =>
    [...requestsQueryKeys.hoa(hoa), 'assigned', `${assignedToMe}`] as const,
  details: (id: number) =>
    [...requestsQueryKeys.all, 'details', `${id}`] as const,
};

export const getQueryKey = ({
  hoaId,
  state,
  assignedToMe,
}: GetRequestsData) => {
  return state
    ? requestsQueryKeys.state(hoaId, state)
    : assignedToMe
      ? requestsQueryKeys.assigned(hoaId, assignedToMe)
      : requestsQueryKeys.hoa(hoaId);
};
