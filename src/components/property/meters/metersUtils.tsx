import { ColumnDef, ColumnType } from '../../common/list/List';

export const columns: ColumnDef[] = [
  {
    name: 'reading_date',
    label: 'Data odczytu',
    type: ColumnType.DATE,
  },
  {
    name: 'reading_value',
    label: 'Wartość',
    type: ColumnType.TEXT,
  },
];
