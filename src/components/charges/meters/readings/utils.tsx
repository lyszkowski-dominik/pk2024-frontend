import { Meter, MeterType } from '../../../../features/meters/metersApiTypes';
import * as Yup from 'yup';
import { Property } from '../../../../features/properties/propertiesTypes';
import { ColumnDef, ColumnType } from '../../../common/list/List';

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
  // {
  //   name: 'meter_type',
  //   label: 'Typ licznika',
  //   type: ColumnType.TEXT,
  // },
  {
    name: 'meter_number',
    label: 'Numer',
    type: ColumnType.TEXT,
  },
  // {
  //   name: 'property_number',
  //   label: 'Numer lokalu',
  //   type: ColumnType.TEXT,
  // },
  // {
  //   name: 'building',
  //   label: 'Budynek',
  //   type: ColumnType.TEXT,
  // },
];

// export const getData = (
//   data: ApiPaginatedResult<MeterReading>,
//   types: MeterType[],
//   properties: Property[],
//   meters: Meter[],
// ) => {
//   const typeMap = getTypeMap(types);
//   const propertyMap = getPropertyMap(properties);
//   const metersMap = getMeterMap(meters);

//   return {
//     ...data,
//     results: data.results.map((r) => ({
//       ...r,
//       meter_type: typeMap[r.meter_type] || '?',
//       property_number:
//         propertyMap[metersMap[r.meter].property].property_number || '?',
//       building: propertyMap[metersMap[r.meter].property].building || '?',
//     })),
//   };
// };

const getTypeMap = (types: MeterType[]) =>
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

const getMeterMap = (meters: Meter[]) =>
  meters.reduce(
    (acc, meter) => {
      acc[meter.id] = {
        property: meter.property,
      };
      return acc;
    },
    {} as Record<number, { property: number }>,
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
  meter: Yup.number().required('Licznik jest wymagany'),
  reading_date: Yup.date().required('Data odczytu jest wymagana'),
  reading_value: Yup.number().required('Wartość jest wymagana'),
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
