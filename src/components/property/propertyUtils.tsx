import { MeterType, RateType } from '../../features/billings/billingTypes';
import { Property } from '../../features/properties/propertiesTypes';
import { ApiPaginatedResult } from '../../types/types';
import { ColumnDef, ColumnType } from '../common/list/List';
import { PropertyTypeDisplayNames } from './types';

export const getUnit = (rateType: RateType) => {
  switch (rateType) {
    case RateType.unit:
      return 'm3';
    case RateType.area:
      return 'm2';
    case RateType.effective_area:
      return 'm2';
    case RateType.person:
      return 'os.';
    case RateType.fixed:
      return '-';
    case RateType.property:
      return 'lok.';
    default:
      return '';
  }
};

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
    name: 'building',
    label: 'Budynek',
    type: ColumnType.TEXT,
  },
  {
    name: 'parent',
    label: 'Przynależy do',
    type: ColumnType.TEXT,
  },
];

export const getData = (data: ApiPaginatedResult<Property>) => ({
  ...data,
  results: data.results.map((property) => ({
    ...property,
    type: PropertyTypeDisplayNames[property.type],
  })),
});
