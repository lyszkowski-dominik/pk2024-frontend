export type GetOwnersData = {
  role: string;
  hoaID: number;
  page: number;
};

export type Owner = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  // phone: string;
  // role: string;
  // hoa: number;
};


export type OwnersResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Owner[];
}