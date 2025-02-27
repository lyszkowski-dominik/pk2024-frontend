import { Adjustment } from '../../../features/adjustments/adjustmentsTypes';
import { Billing } from '../../../features/billings/billingTypes';
import { Payment } from '../../../features/payments/paymentsTypes';
import { ApiPaginatedResult } from '../../../types/types';
import { ColumnDef, ColumnType } from '../../common/list/List';

export const columns = (isManager?: boolean): ColumnDef[] => [
  {
    name: 'date',
    label: 'Data',
    type: ColumnType.DATE,
  },
  {
    name: 'total_amount',
    label: 'Kwota',
    type: ColumnType.AMOUNT,
  },
  {
    name: 'display_type',
    label: 'Typ',
    type: ColumnType.TEXT,
  },
  ...(isManager
    ? [
        {
          name: 'owners',
          label: 'Właściciele',
          type: ColumnType.OTHER,
        },
      ]
    : []),
];

export const getData = (
  billings?: ApiPaginatedResult<Billing>,
  payments?: ApiPaginatedResult<Payment>,
  adjustments?: ApiPaginatedResult<Adjustment>,
  isManager?: boolean,
) => [
  ...(billings?.results.map((billing) => ({
    id: billing.id,
    date: billing.month,
    total_amount: billing.total_amount,
    type: 'billing',
    display_type: 'Rachunek',
    ...(isManager && {
      owners: billing.ownership_data.owners?.map((owner) => (
        <p key={owner.id}>
          {owner.first_name} {owner.last_name}
        </p>
      )),
    }),
  })) ?? []),
  ...(payments?.results.map((payment) => ({
    id: payment.id,
    date: payment.date,
    total_amount: payment.amount_paid,
    type: 'payment',
    display_type: 'Płatność',
    ...(isManager && {
      owners: payment.ownership_data.owners?.map((owner) => (
        <p key={owner.id}>
          {owner.first_name} {owner.last_name}
        </p>
      )),
    }),
  })) ?? []),
  ...(adjustments?.results.map((adjustment) => ({
    id: adjustment.id,
    date: adjustment.end_month,
    total_amount: adjustment.total_amount,
    type: 'adjustment',
    display_type: 'Korekta',
    ...(isManager && {
      owners: adjustment.ownership_data.owners?.map((owner) => (
        <p key={owner.id}>
          {owner.first_name} {owner.last_name}
        </p>
      )),
    }),
  })) ?? []),
];
