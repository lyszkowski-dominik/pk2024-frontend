import {
  MeterReading,
  MeterType,
} from '../../../../features/meters/metersApiTypes';
import * as Yup from 'yup';
import { ColumnDef, ColumnType } from '../../../common/list/List';
import { ApiPaginatedResult } from '../../../../types/types';
import { getUnitDisplay } from '../meterTypes/utils';

export const columns: ColumnDef[] = [
  {
    name: 'reading_date',
    label: 'Data',
    type: ColumnType.DATE,
  },
  {
    name: 'reading_value',
    label: 'Wartość',
    type: ColumnType.TEXT,
  },
  {
    name: 'meter_type',
    label: 'Typ licznika',
    type: ColumnType.TEXT,
  },
  {
    name: 'meter_number',
    label: 'Numer',
    type: ColumnType.TEXT,
  },
  {
    name: 'property_number',
    label: 'Numer lokalu',
    type: ColumnType.TEXT,
  },
  {
    name: 'property_building',
    label: 'Budynek',
    type: ColumnType.TEXT,
  },
];

export const getData = (
  data: ApiPaginatedResult<MeterReading>,
  types: MeterType[],
) => {
  const typeMap = getTypeMap(types);

  return {
    ...data,
    results: data.results.map((r) => ({
      ...r,
      reading_value: `${parseFloat(r.reading_value).toFixed(2)} ${getUnitDisplay(r.unit)}`,
      meter_type: typeMap[r.meter_type] || '-',
      property_number: r.property_number || '-',
      property_building: r.property_building || '-',
    })),
  };
};

const getTypeMap = (types: MeterType[]) =>
  types.reduce(
    (acc, type) => {
      acc[type.id] = type.label;
      return acc;
    },
    {} as Record<number, string>,
  );

export const validationSchema = Yup.object({
  meter: Yup.number().required('Licznik jest wymagany'),
  reading_date: Yup.date().required('Data odczytu jest wymagana'),
  reading_value: Yup.number()
    .required('Wartość jest wymagana')
    .min(0, 'Wartość musi być większa od 0'),
});
