import { ColumnDef, ColumnType } from '../common/list/List';

export const requestColumns: ColumnDef[] = [
  {
    name: 'title',
    label: 'Tytuł',
    type: ColumnType.TEXT,
  },
  {
    name: 'created',
    label: 'Utworzono',
    type: ColumnType.DATETIME,
  },
  {
    name: 'state',
    label: 'Stan',
    type: ColumnType.TEXT,
  },
];

export const requestTypesColumns: ColumnDef[] = [
  {
    name: 'title',
    label: 'Tytuł',
    type: ColumnType.TEXT,
  },
  {
    name: 'description',
    label: 'Opis',
    type: ColumnType.TEXT,
  },
];
