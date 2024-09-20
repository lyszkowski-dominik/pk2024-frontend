export type GetUsersData = {
  role: string;
  hoaID: number;
  page: number;
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
