import { ListRequest } from '../../types/types';
import { Ownership } from '../ownerships/ownershipTypes';
import { Rate } from '../rates/ratesTypes';

export type Billing = {
  id: number;
  bills: Bill[];
  total_amount: number;
  ownership_data: Ownership;
  property: number;
  month: string;
  payment_deadline: string;
};

export type Bill = {
  id: number;
  rate: Rate;
  units_consumed: number;
  total_amount: number;
  monthly_bill: number;
};

export const billingsQueryKeys = {
  all: ['billings'] as const,
  filters: ({
    hoaId,
    month,
    year,
    page,
    pageSize,
  }: Partial<GetBillingsRequest>) =>
    [
      ...billingsQueryKeys.all,
      ...(hoaId ? ['hoa', `${hoaId}`] : []),
      ...(year ? ['year', `${year}`] : []),
      ...(month ? ['month', `${month}`] : []),
      ...(page ? ['page', `${page}`] : []),
      ...(pageSize ? ['pageSize', `${pageSize}`] : []),
    ] as const,
  details: (id: number) =>
    [...billingsQueryKeys.all, 'details', `${id}`] as const,
};

export type GetBillingsRequest = ListRequest & {
  hoaId?: number;
  propertyId?: number;
  day?: number;
  month?: number;
  year?: number;
};
