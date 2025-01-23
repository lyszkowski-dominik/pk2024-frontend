import { IBilling } from '../../../features/billings/billingTypes';
import { ApiPaginatedResult } from '../../../types/types';
import { ColumnDef, ColumnType } from '../../common/list/List';

export const columns: ColumnDef[] = [
  {
    name: 'month',
    label: 'Data',
    type: ColumnType.DATETIME,
  },
  {
    name: 'total_amount',
    label: 'Kwota',
    type: ColumnType.AMOUNT,
  },
  {
    name: 'status',
    label: 'Status',
    type: ColumnType.TEXT,
  },
];

export const getData = (data: ApiPaginatedResult<IBilling>) => ({
  ...data,
  is_paid: data.results.map((billing) => ({
    ...billing,
    status: billing.is_paid ? 'Opłacono' : 'Oczekuje na wpłatę',
  })),
});
