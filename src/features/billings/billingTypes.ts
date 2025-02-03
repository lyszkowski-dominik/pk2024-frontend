import { ListRequest } from '../../types/types';
import { Meter } from '../meters/metersApiTypes';

export interface IBilling {
  id: number;
  bills: IBill[];
  total_amount: number;
  is_paid: boolean;
  ownership: number;
  property: number;
  month: string;
}

export interface IBill {
  id: number;
  rate: IRate;
  meter: Meter;
  billing_date: string;
  units_consumed: number;
  total_amount: number;
  property: number;
  ownership: number;
  monthly_bill: number;
}

export interface IRate {
  id?: number;
  name: string;
  type: RateType;
  rate_per_unit: number;
  effective_date: string;
  end_date?: string;
  applies_to?: MeterType;
  hoa: number;
}

export enum RateType {
  unit = 'Jednostka',
  area = 'Powierzchnia',
  effective_area = 'Powierzchnia użytkowa',
  person = 'Osoba',
  fixed = 'Stała',
  property = 'Nieruchomość',
}

export enum MeterType {
  hot_water = 'Gorąca woda',
  cold_water = 'Zimna woda',
}

export const billingsQueryKeys = {
  all: ['billings'] as const,
  filters: ({
    hoaId,
    propertyId,
    page,
    pageSize,
  }: Partial<GetBillingsRequest>) =>
    [
      ...billingsQueryKeys.all,
      ...(hoaId ? ['hoa', `${hoaId}`] : []),
      ...(propertyId ? ['property', `${propertyId}`] : []),
      ...(page ? ['page', `${page}`] : []),
      ...(pageSize ? ['pageSize', `${pageSize}`] : []),
    ] as const,
  details: (id: number) =>
    [...billingsQueryKeys.all, 'details', `${id}`] as const,
};

export type GetBillingsRequest = ListRequest & {
  hoaId: number;
  propertyId: number;
};
