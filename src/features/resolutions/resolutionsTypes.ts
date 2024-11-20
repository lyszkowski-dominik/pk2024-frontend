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

export type GetResolutionRequest = {
  id: number;
};

export enum Vote {
  for,
  against,
  abstain,
}

export const voteDisplayMap = {
  [Vote.for]: 'Za',
  [Vote.against]: 'Przeciw',
  [Vote.abstain]: 'Wstrzymano się',
};
