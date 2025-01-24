import { ColumnDef, ColumnType } from "../../components/common/list/List";
export const ratesColumns: ColumnDef[] = [
  {
    name: 'name',
    label: 'Nazwa',
    type: ColumnType.TEXT,
  },
  {
    name: 'type',
    label: 'Typ',
    type: ColumnType.ENUM,
  },
  {
    name: 'effective_date',
    label: 'Data obowiązywania',
    type: ColumnType.TEXT,
  },
  {
    name: 'rate_per_unit',
    label: 'Stawka za jednostkę',
    type: ColumnType.TEXT,
  },
  {
    name: 'delete-icon',
    label: '',
    type: ColumnType.ACTION,
  },
];