import { ColumnDef, ColumnType } from '../common/list/List';

export const columns: ColumnDef[] = [
  {
    name: 'message',
    label: 'Wiadomość',
    type: ColumnType.TEXT,
  },
  {
    name: 'created_at',
    label: 'Utworzono',
    type: ColumnType.DATETIME,
  },
];
