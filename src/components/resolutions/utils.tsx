import * as Yup from 'yup';
import { ColumnDef, ColumnType } from '../common/list/List';

export const columns: ColumnDef[] = [
  {
    name: 'title',
    label: 'Nazwa',
    type: ColumnType.TEXT,
  },
  {
    name: 'created_at',
    label: 'Utworzono',
    type: ColumnType.DATETIME,
  },
  {
    name: 'start_date',
    label: 'Rozpoczęcie',
    type: ColumnType.DATETIME,
  },
  {
    name: 'end_date',
    label: 'Zakończenie',
    type: ColumnType.DATETIME,
  },
];

export const validationSchema = Yup.object({
  title: Yup.string().required('Tytuł jest wymagany'),
  description: Yup.string().required('Opis jest wymagany'),
  start_date: Yup.string().required('Data rozpoczęcia jest wymagana'),
  end_date: Yup.string().required('Data zakończenia jest wymagana'),
});
