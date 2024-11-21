import { ListRequest } from '../../types/types';

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
  hoa: (hoa: number) => [...resolutionsQueryKeys.all, 'hoa', `${hoa}`] as const,
  details: (id: number) =>
    [...resolutionsQueryKeys.all, 'details', `${id}`] as const,
};
