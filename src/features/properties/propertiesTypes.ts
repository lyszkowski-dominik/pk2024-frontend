import type { ListRequest } from '../../types/types';
import { Ownership } from '../ownerships/ownershipTypes';
import { User } from '../users/usersTypes';

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

export type Property = {
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
  properties?: Property[] | null;
  owners?: User[] | null;
  ownerships?: Ownership[] | null;
};

export type PropertiesRequest = ListRequest & {
  hoaId: number;
};

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

export const propertiesQueryKeys = {
  all: ['properies'] as const,
  filters: ({ hoaId, page, pageSize }: Partial<PropertiesRequest>) =>
    [
      ...propertiesQueryKeys.all,
      ...(hoaId ? ['hoa', `${hoaId}`] : []),
      ...(page ? ['page', `${page}`] : []),
      ...(pageSize ? ['pageSize', `${pageSize}`] : []),
    ] as const,
  details: (id: number) =>
    [...propertiesQueryKeys.all, 'details', `${id}`] as const,
};

export type BuildingsRequest = {
  id: number
  address:{
    id: number
    city: string
    street: string
    number: string
    postal_code: string
  },
  number: string
  area: string
  floor_min: number
  floor_max: number
  hoa: number
}