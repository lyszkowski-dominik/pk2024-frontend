import { ListRequest } from '../../types/types';
import { Ownership } from '../ownerships/ownershipTypes';
import { Rate } from '../rates/ratesTypes';

export type Adjustment = {
  id: number;
  entries: Entry[];
  total_amount: number;
  ownership: number;
  property: number;
  start_month: string;
  end_month: string;
  payment_deadline: string;
  ownership_data: Ownership;
};

export type Entry = {
  id: number;
  rate: Rate;
  units_consumed: number;
  amount_paid: number;
  units_paid: number;
  units_diff: number;
  total_amount: number;
  adjustment_bill: number;
};

export const adjustmentsQueryKeys = {
  all: ['adjustments'] as const,
  filters: ({
    hoaId,
    month,
    year,
    page,
    pageSize,
    order_by,
  }: Partial<GetAdjustmentsRequest>) =>
    [
      ...adjustmentsQueryKeys.all,
      ...(hoaId ? ['hoa', `${hoaId}`] : []),
      ...(year ? ['year', `${year}`] : []),
      ...(month ? ['month', `${month}`] : []),
      ...(page ? ['page', `${page}`] : []),
      ...(pageSize ? ['pageSize', `${pageSize}`] : []),
      ...(order_by ? ['order_by', `${order_by}`] : []),
    ] as const,
  details: (id: number) =>
    [...adjustmentsQueryKeys.all, 'details', `${id}`] as const,
};

export const adjustmentsDatesQueryKeys = {
  all: ['adjustmentsDates'] as const,
  filters: ({ hoaId, order_by }: Partial<GetAdjustmentsRequest>) =>
    [
      ...adjustmentsQueryKeys.all,
      ...(hoaId ? ['hoa', `${hoaId}`] : []),
      ...(order_by ? ['order_by', `${order_by}`] : []),
    ] as const,
};

export type GetAdjustmentsRequest = ListRequest & {
  hoaId?: number;
  propertyId?: number;
  day?: number;
  month?: number;
  year?: number;
};
