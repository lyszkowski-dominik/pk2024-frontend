import type { ListRequest } from './types';

export enum ModalType {
  Add,
  Import,
  Export,
}

export interface IPropertiesState {
  updatedOwnerships: boolean;
  updatedBillings: boolean;
  updatedMeters: boolean;
  updatedMeterReadings: boolean;
}

export interface Property {
  id: number;
  type: PropertyType;
  building: string;
  number: string;
  floor: number;
  total_area: number;
  usable_area: number;
  description?: string;
  inhabitants?: number | null;
  hoa: number;
  parent?: number | null;
}

export interface PropertiesRequest extends ListRequest {
  hoaId?: number;
  propertyId?: number;
}

export interface PropertiesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Property[];
}

export enum PropertyType {
  Flat = 'flat',
  Storage = 'storage',
  ParkingSpace = 'parking_space',
  Garage = 'garage',
  Business = 'business',
  Common = 'common',
  Other = 'other',
}

export const PropertyTypeDisplayNames: { [key in PropertyType]: string } = {
  [PropertyType.Flat]: 'Mieszkanie',
  [PropertyType.Storage]: 'Komórka lokatorska',
  [PropertyType.ParkingSpace]: 'Miejsce parkingowe',
  [PropertyType.Garage]: 'Garaż',
  [PropertyType.Business]: 'Lokal usługowy',
  [PropertyType.Common]: 'Lokal do użytku wspólnego',
  [PropertyType.Other]: 'Inne',
};

export enum PropertyTab {
  billings,
  meters,
  owners,
}
