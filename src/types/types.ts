export enum UserRole {
  Admin = 'hoa_administrator',
  Manager = 'manager',
  Owner = 'owner',
}

export enum ModalType {
  Add,
  Import,
  Export,
  Edit,
  Delete,
  Details,
}

export type ApiPaginatedResult<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};

export interface ListRequestProperty {
  page: number;
  pageSize: number;
  propertyId?: number;
}

export interface ListRequest {
  page: number;
  pageSize?: number;
}
