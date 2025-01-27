import { ListRequest } from '../../types/types';
import { CalculatingMethod } from './meterTypes/meterTypesUtlis';

export type GetMetersRequest = ListRequest & {
  hoaId?: number;
  propertyId?: number;
  isActive?: boolean;
  meterType?: number;
};

export type GetMeterReadingsRequest = ListRequest & {
  hoaId?: number;
  meterId?: number;
  readingDateMin?: string;
  readingDateMax?: string;
};

export type GetMeterTypesRequest = ListRequest & {
  hoaId: number;
  isActive?: boolean;
};

export type MeterType = {
  id: number;
  label: string;
  name: string;
  unit: string;
  advance_calculating_method: CalculatingMethod;
  average_use: number;
  active: boolean;
};

export type MeterReading = {
  id: number;
  reading_date: string;
  reading_value: string;
  meter_type: number;
  meter_number: string;
  meter: number;
  ownership: number;
};

export type Meter = {
  id: number;
  number: string;
  installation_date: string;
  removal_date: string;
  property: number;
  type: number;
  active: boolean;
};

export enum ChargingMethod {
  NUMER_OF_PERSONS = 'number_of_persons',
  LOCAL = 'local',
  CONSUMPTION = 'consumption',
  TOTAL_FLOOT_AREA = 'total_floor_area',
  USABLE_AREA = 'usable_area',
}

export const chargingMethodDisplayMap = {
  [ChargingMethod.NUMER_OF_PERSONS]: 'Ilość osób',
  [ChargingMethod.LOCAL]: 'Lokal',
  [ChargingMethod.CONSUMPTION]: 'Zużycie',
  [ChargingMethod.TOTAL_FLOOT_AREA]: 'Powierzchnia całkowita',
  [ChargingMethod.USABLE_AREA]: 'Powierzchnia użytkowa',
};
