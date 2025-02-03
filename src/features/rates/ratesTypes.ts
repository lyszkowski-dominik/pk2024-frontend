import { ListRequest } from '../../types/types';
import { ChargingMethod } from '../meters/metersApiTypes';

export interface RatesRequest {
  page: number;
  pageSize: number;
  hoaId: number;
  onlyOld?: boolean;
}

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
  filters: ({ hoaId, state }: Partial<GetRatesRequest>) =>
    [
      ...ratesQueryKeys.all,
      ...(hoaId ? ['hoa', `${hoaId}`] : []),
      ...(state ? ['state', `${state}`] : []),
    ] as const,
  details: (id: number) => [...ratesQueryKeys.all, 'details', `${id}`] as const,
};
