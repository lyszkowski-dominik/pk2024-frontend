export enum UserRole {
  Admin = 'hoa_administrator',
  Manager = 'manager',
  Owner = 'owner',
}

export type ApiPaginatedResult<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};

export interface ListRequest {
  page: number;
  pageSize: number;
  propertyId?: number;
}
