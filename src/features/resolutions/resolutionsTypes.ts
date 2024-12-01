import { ApiFile, ListRequest } from '../../types/types';

export type Resolution = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  start_date: string;
  end_date: string;
  hoa: number;
  vote: Vote;
  can_vote: boolean;
  can_edit: boolean;
  results: any;
  files: ApiFile[];
};

export type GetResolutionsRequest = ListRequest & {
  hoaId: number;
};

export enum Vote {
  for = 'for',
  against = 'against',
  abstain = 'abstain',
}

export const voteDisplayMap = {
  [Vote.for]: 'Za',
  [Vote.against]: 'Przeciw',
  [Vote.abstain]: 'Wstrzymano się',
};

export const resolutionsQueryKeys = {
  all: ['resolutions'] as const,
  filters: ({ hoaId, page, pageSize }: Partial<GetResolutionsRequest>) =>
    [
      ...resolutionsQueryKeys.all,
      ...(hoaId ? ['hoa', `${hoaId}`] : []),
      ...(page ? ['page', `${page}`] : []),
      ...(pageSize ? ['pageSize', `${pageSize}`] : []),
    ] as const,
  details: (id: number) =>
    [...resolutionsQueryKeys.all, 'details', `${id}`] as const,
};
