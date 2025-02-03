import * as Yup from 'yup';
import { Rate } from '../../../features/rates/ratesTypes';
import {
  ChargingMethod,
  chargingMethodDisplayMap,
  MeterType,
} from '../../../features/meters/metersApiTypes';
import { ColumnDef, ColumnType } from '../../common/list/List';

export const columns: ColumnDef[] = [
  {
    name: 'name',
    label: 'Nazwa',
    type: ColumnType.TEXT,
  },
  {
    name: 'charging_method',
    label: 'Metoda naliczania',
    type: ColumnType.TEXT,
  },
  {
    name: 'meter_types',
    label: 'Źródło danych',
    type: ColumnType.TEXT,
  },
  {
    name: 'rate_per_unit',
    label: 'Stawka',
    type: ColumnType.AMOUNT,
  },
];

export const getData = (data: Rate[], types: MeterType[]) => {
  const typeMap = getTypeMap(types);

  return {
    ...data,
    results: data.map((rate) => ({
      ...rate,
      meter_types: rate.meter_types.map((type) => typeMap[type]),
      charging_method: chargingMethodDisplayMap[rate.charging_method],
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

export const validationSchema = Yup.object({
  start: Yup.string().required('Data jest wymagana'),
  rates: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Nazwa jest wymagana'),
      charging_method: Yup.string().required('Sposób naliczania jest wymagany'),
      meter_types: Yup.array().when('charging_method', {
        is: ChargingMethod.CONSUMPTION,
        then: (schema) => schema.min(1, 'Wybierz źródło danych'),
        otherwise: (schema) => schema.nullable().notRequired(),
      }),
      rate_per_unit: Yup.number()
        .required('Stawka jest wymagana')
        .positive('Stawka musi być większa od zera'),
    }),
  ),
});
