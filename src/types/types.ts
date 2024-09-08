export enum UserRole {
  Admin = 'Administrator',
  Manager = 'Manager',
  Owner = 'Owner',
}

export type ApiPaginatedResult<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};
