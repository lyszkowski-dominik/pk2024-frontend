export enum ModalType {
  Add,
  Import,
  Export,
  Edit,
  Delete,
  Details,
}

export type PropertyForm = {
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
};

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
