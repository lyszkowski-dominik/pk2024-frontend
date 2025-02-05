import { MeterType } from '../../features/billings/billingTypes';
import {
  Property,
  PropertyType,
} from '../../features/properties/propertiesTypes';
import { ApiPaginatedResult } from '../../types/types';
import { ColumnDef, ColumnType } from '../common/list/List';
import { PropertyTypeDisplayNames } from './types';

export const getMeterType = (meterType: MeterType) => {
  switch (meterType) {
    case MeterType.cold_water:
      return 'Licznik zimnej wody';
    case MeterType.hot_water:
      return 'Licznik ciepłej wody';
    default:
      return '';
  }
};

export const columns: ColumnDef[] = [
  {
    name: 'number',
    label: 'Numer',
    type: ColumnType.TEXT,
  },
  {
    name: 'type',
    label: 'Rodzaj',
    type: ColumnType.TEXT,
  },
  {
    name: 'floor',
    label: 'Piętro',
    type: ColumnType.TEXT,
  },
  {
    name: 'total_area',
    label: 'Powierzchnia całkowita',
    type: ColumnType.TEXT,
  },
  {
    name: 'usable_area',
    label: 'Powierzchnia użytkowa',
    type: ColumnType.TEXT,
  },
  {
    name: 'building',
    label: 'Budynek',
    type: ColumnType.TEXT,
  },
];

export const getData = (data: ApiPaginatedResult<Property>) => ({
  ...data,
  results: getFormattedData(data.results),
});

export const getFormattedData = (data: Property[]) =>
  data.map((property) => ({
    ...property,
    type: PropertyTypeDisplayNames[property.type],
    usable_area: `${property.usable_area} m²`,
    total_area: `${property.total_area} m²`,
  }));

export const mustHaveParent = (propertyType: PropertyType) => {
  switch (propertyType) {
    case PropertyType.Garage:
    case PropertyType.Other:
    case PropertyType.ParkingSpace:
    case PropertyType.Storage:
      return true;
    default:
      return false;
  }
};

export const canBeParent = (propertyType: PropertyType) => {
  switch (propertyType) {
    case PropertyType.Flat:
    case PropertyType.Business:
      return true;
    default:
      return false;
  }
};
