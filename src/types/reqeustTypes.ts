export type GetRequestsData = {
  hoaID: number;
  state?: string;
  page: number;
  pageSize: number;
  assignedToMe?: boolean;
  queryKey?: string;
};

export type GetRequestTypesData = {
  hoaID: number;
  page: number;
  pageSize: number;
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
  state: string;
  notes: string;
  type: {
    id: number;
    hoa: number;
    title: string;
    description: string;
  };
  comments: Comment[];
};
