import { ListRequest } from '../../types/types';
import { ChargingMethod } from '../meters/metersApiTypes';

export type GetRatesRequest = ListRequest & {
  hoaId: number;
  state?: RateSetState;
};

export interface RatesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Rate[];
}

export type RatesSet = {
  id: number;
  hoa: number;
  start: string;
  end: string;
  rates: Rate[];
};

export type Rate = {
  id: number;
  name: string;
  unit: string;
  charging_method: ChargingMethod;
  rate_per_unit: number;
  meter_types: number[];
  rate_set: number;
};

export enum RateSetState {
  CURRENT = 'current',
  FUTURE = 'future',
  PAST = 'past',
}

export const ratesQueryKeys = {
  all: ['rates'] as const,
  filters: ({ hoaId, state, page }: Partial<GetRatesRequest>) =>
    [
      ...ratesQueryKeys.all,
      ...(hoaId ? ['hoa', `${hoaId}`] : []),
      ...(state ? ['state', `${state}`] : []),
      ...(page ? ['page', `${page}`] : []),
    ] as const,
  details: (id: number) => [...ratesQueryKeys.all, 'details', `${id}`] as const,
};

export const ratesAdjustmentQueryKeys = {
  all: ['ratesAdjustment'] as const,
  filters: ({ hoaId, endDate }: Partial<{ hoaId: number; endDate: string }>) =>
    [
      ...ratesQueryKeys.all,
      ...(hoaId ? ['hoa', `${hoaId}`] : []),
      ...(endDate ? ['endDate', `${endDate}`] : []),
    ] as const,
  details: (id: number) => [...ratesQueryKeys.all, 'details', `${id}`] as const,
};
