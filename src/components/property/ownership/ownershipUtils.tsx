import { Ownership } from '../../../features/ownerships/ownershipTypes';
import { ApiPaginatedResult } from '../../../types/types';
import { ColumnDef, ColumnType } from '../../common/list/List';
import * as Yup from 'yup';

export const columns: ColumnDef[] = [
  {
    name: 'owners',
    label: 'Właściciele',
    type: ColumnType.OTHER,
  },
  {
    name: 'start',
    label: 'Data nabycia',
    type: ColumnType.DATE,
  },
  {
    name: 'end',
    label: 'Data zbycia',
    type: ColumnType.DATE,
  },
];

export const getData = (data: ApiPaginatedResult<Ownership>) => ({
  ...data,
  results: data.results.map((ownership) => ({
    ...ownership,
    owners: ownership.owners?.map((owner) => (
      <p key={owner.id}>
        {owner.first_name} {owner.last_name}
      </p>
    )),
  })),
});

export const validationSchema = Yup.object().shape({
  owners: Yup.array().required('Dodaj właściciela'),
  start: Yup.string().required('Podaj datę nabycia'),
});

export const changeValidationSchema = Yup.object().shape({
  owners: Yup.array().required('Dodaj właściciela'),
  meter_readings: Yup.array()
    .of(
      Yup.object().shape({
        reading_value: Yup.number()
          .required('Odczyt jest wymagany')
          .min(0, 'Odczyt musi być większy od zera'),
        meter: Yup.number().required('Podaj numer licznika'),
      }),
    )
    .required('Dodaj odczyty'),
  date: Yup.string().required('Podaj datę zmiany właściciela'),
  inhabitants: Yup.number()
    .required('Podaj liczbę mieszkańców')
    .min(1, 'Podaj liczbę mieszkańców'),
});
