import { Meter, MeterType } from '../../../../features/meters/metersApiTypes';
import * as Yup from 'yup';
import { Property } from '../../../../features/properties/propertiesTypes';
import { ApiPaginatedResult } from '../../../../types/types';
import { ColumnDef, ColumnType } from '../../../common/list/List';

export const columns: ColumnDef[] = [
  {
    name: 'type',
    label: 'Typ',
    type: ColumnType.TEXT,
  },
  {
    name: 'number',
    label: 'Numer',
    type: ColumnType.TEXT,
  },
  {
    name: 'installation_date',
    label: 'Data instalacji',
    type: ColumnType.DATE,
  },
  {
    name: 'removal_date',
    label: 'Data demontażu',
    type: ColumnType.DATE,
  },
  {
    name: 'property_number',
    label: 'Numer lokalu',
    type: ColumnType.TEXT,
  },
  {
    name: 'building',
    label: 'Budynek',
    type: ColumnType.TEXT,
  },
];

export const getData = (
  data: ApiPaginatedResult<Meter>,
  types: MeterType[],
  properties: Property[],
) => {
  const typeMap = getTypeMap(types);
  const propertyMap = getPropertyMap(properties);

  return {
    ...data,
    results: data.results.map((meter) => ({
      ...meter,
      type: typeMap[meter.type] || '-',
      property_number: propertyMap[meter.property].property_number || '-',
      building: propertyMap[meter.property].building || '-',
    })),
  };
};

export const getTypeMap = (types: MeterType[]) =>
  types.reduce(
    (acc, type) => {
      acc[type.id] = type.label;
      return acc;
    },
    {} as Record<number, string>,
  );

const getPropertyMap = (properties: Property[]) =>
  properties.reduce(
    (acc, property) => {
      acc[property.id] = {
        property_number: property.number,
        building: property.building,
      };
      return acc;
    },
    {} as Record<number, { property_number: string; building: string }>,
  );

// const getUnitDisplay = (unit: string) => {
//   switch (unit.toLowerCase()) {
//     case 'm2':
//     case 'm^2':
//       return 'm²';
//     case 'm3':
//     case 'm^3':
//       return 'm³';
//     default:
//       return unit;
//   }
// };

export const validationSchema = Yup.object({
  property: Yup.number().required('Lokal jest wymagany'),
  number: Yup.string().required('Numer jest wymagany'),
  type: Yup.number().required('Typ jest wymagany'),
  installation_date: Yup.date().required('Data instalacji jest wymagana'),
  removal_date: Yup.date().nullable(),
});

// export const validationSchemaEdit = Yup.object({
//   name: Yup.string().required('Nazwa jest wymagana'),
//   unit: Yup.string().required('Jednostka jest wymagana'),
//   advance_calculating_method: Yup.mixed<CalculatingMethod>()
//     .oneOf(Object.values(CalculatingMethod))
//     .required('Sposób naliczania jest wymagany'),
//   average_use: Yup.number()
//     .required('Norma zużycia jest wymagana')
//     .moreThan(0, 'Norma zużycia musi być większa od 0'),
// });
