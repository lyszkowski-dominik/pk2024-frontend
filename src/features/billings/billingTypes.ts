import { ListRequest } from '../../types/types';

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
  meter: IMeter;
  billing_date: string;
  units_consumed: number;
  total_amount: number;
  property: number;
  ownership: number;
  monthly_bill: number;
}

export interface IRate {
  id: number;
  name: string;
  type: RateType;
  rate_per_unit: number;
  effective_date: string;
  applies_to: MeterType;
  hoa: number;
}

export interface IMeter {
  id: number;
  number: string;
  type: MeterType;
  unit_of_measurement: string;
  installation_date: string;
  property: number;
}

export type MeterReading = {
  id: number;
  reading_date: string;
  reading_value: string;
  meter: number;
  meter_number: string;
  meter_type: MeterType;
};

export enum RateType {
  unit = 'unit',
  area = 'area',
  effective_area = 'effective_area',
  person = 'person',
  fixed = 'fixed',
  property = 'property',
}

export enum MeterType {
  hot_water = 'hot_water',
  cold_water = 'cold_water',
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
