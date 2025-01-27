import { MeterType } from '../../../../features/meters/metersApiTypes';
import {
  CalculatingMethod,
  calculatingMethodDisplayMap,
} from '../../../../features/meters/meterTypes/meterTypesUtlis';
import { ApiPaginatedResult } from '../../../../types/types';
import { ColumnDef, ColumnType } from '../../../common/list/List';
import * as Yup from 'yup';

export const columns: ColumnDef[] = [
  {
    name: 'label',
    label: 'Oznaczenie',
    type: ColumnType.TEXT,
  },
  {
    name: 'name',
    label: 'Nazwa',
    type: ColumnType.TEXT,
  },
  {
    name: 'unit',
    label: 'Jednostka',
    type: ColumnType.TEXT,
  },
  {
    name: 'advance_calculating_method',
    label: 'Sposób naliczania',
    type: ColumnType.TEXT,
  },
  {
    name: 'average_use',
    label: 'Norma zużycia',
    type: ColumnType.TEXT,
  },
];

export const getData = (data: ApiPaginatedResult<MeterType>) => ({
  ...data,
  results: data.results.map((type) => ({
    ...type,
    advance_calculating_method:
      calculatingMethodDisplayMap[type.advance_calculating_method],
    unit: getUnitDisplay(type.unit),
  })),
});

const getUnitDisplay = (unit: string) => {
  switch (unit.toLowerCase()) {
    case 'm2':
    case 'm^2':
      return 'm²';
    case 'm3':
    case 'm^3':
      return 'm³';
    default:
      return unit;
  }
};

export const validationSchema = (existingLabels: string[]) =>
  Yup.object({
    label: Yup.string()
      .required('Oznaczenie jest wymagane')
      .notOneOf(existingLabels, 'Oznaczenie już istnieje'),
    name: Yup.string().required('Nazwa jest wymagana'),
    unit: Yup.string().required('Jednostka jest wymagana'),
    advance_calculating_method: Yup.mixed<CalculatingMethod>()
      .oneOf(Object.values(CalculatingMethod))
      .required('Sposób naliczania jest wymagany'),
    average_use: Yup.number()
      .required('Norma zużycia jest wymagana')
      .moreThan(0, 'Norma zużycia musi być większa od 0'),
  });

export const validationSchemaEdit = Yup.object({
  name: Yup.string().required('Nazwa jest wymagana'),
  unit: Yup.string().required('Jednostka jest wymagana'),
  advance_calculating_method: Yup.mixed<CalculatingMethod>()
    .oneOf(Object.values(CalculatingMethod))
    .required('Sposób naliczania jest wymagany'),
  average_use: Yup.number()
    .required('Norma zużycia jest wymagana')
    .moreThan(0, 'Norma zużycia musi być większa od 0'),
});
