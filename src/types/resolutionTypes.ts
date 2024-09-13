export type Resolution = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  start_date: string;
  end_date: string;
  hoa: number;
  vote: string;
  can_vote: boolean;
  can_edit: boolean;
  results: any;
};

export type GetResolutionsData = {
  hoaID: number;
  page: number;
  pageSize: number;
};

export type GetResolutionData = {
  id: number;
};

export type VoteResolutionData = {
  id: number;
  choice: string;
}
