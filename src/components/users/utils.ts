import { ColumnDef, ColumnType } from '../common/list/List';

export const columns: ColumnDef[] = [
  {
    name: 'first_name',
    label: 'Imię',
    type: ColumnType.TEXT,
  },
  {
    name: 'last_name',
    label: 'Nazwisko',
    type: ColumnType.TEXT,
  },
  {
    name: 'email',
    label: 'Email',
    type: ColumnType.TEXT,
  },
  {
    name: 'delete-icon',
    label: '',
    type: ColumnType.ACTION,
  },
];
