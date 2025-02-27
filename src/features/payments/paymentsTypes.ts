import { ListRequest } from '../../types/types';
import { Ownership } from '../ownerships/ownershipTypes';

export type Payment = {
  id: number;
  tr_id: number;
  date: string;
  description: string;
  amount_paid: number;
  payment_method: string;
  error: string;
  paid: boolean;
  property: number;
  ownership_data: Ownership;
};

export const paymentsQueryKeys = {
  all: ['payments'] as const,
  filters: ({
    hoaId,
    month,
    year,
    page,
    pageSize,
  }: Partial<GetPaymentsRequest>) =>
    [
      ...paymentsQueryKeys.all,
      ...(hoaId ? ['hoa', `${hoaId}`] : []),
      ...(month ? ['month', `${month}`] : []),
      ...(year ? ['year', `${year}`] : []),
      ...(page ? ['page', `${page}`] : []),
      ...(pageSize ? ['pageSize', `${pageSize}`] : []),
    ] as const,
  details: (id: number) =>
    [...paymentsQueryKeys.all, 'details', `${id}`] as const,
};

export type GetPaymentsRequest = ListRequest & {
  hoaId?: number;
  propertyId?: number;
  month?: number;
  year?: number;
};
