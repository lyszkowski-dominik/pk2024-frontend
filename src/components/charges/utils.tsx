import { Payment } from '../../features/payments/paymentsTypes';
import { ApiPaginatedResult } from '../../types/types';
import { ColumnDef, ColumnType } from '../common/list/List';

export const accountColumns: ColumnDef[] = [
  {
    name: 'property',
    label: 'Lokal',
    type: ColumnType.TEXT,
  },
  {
    name: 'total_amount',
    label: 'Suma',
    type: ColumnType.AMOUNT,
  },
  {
    name: 'ownership',
    label: 'Właściciel',
    type: ColumnType.TEXT,
  },
];

export const paymentColumns: ColumnDef[] = [
  {
    name: 'property',
    label: 'Lokal',
    type: ColumnType.TEXT,
  },
  {
    name: 'date',
    label: 'Data',
    type: ColumnType.DATE,
  },
  {
    name: 'payment_method',
    label: 'Metoda płatności',
    type: ColumnType.TEXT,
  },
  {
    name: 'amount_paid',
    label: 'Zapłacono',
    type: ColumnType.AMOUNT,
  },
  {
    name: 'ownership',
    label: 'Właściciel',
    type: ColumnType.TEXT,
  },
  {
    name: 'status',
    label: 'Status',
    type: ColumnType.TEXT,
  },
];

export const getPaymentData = (data: ApiPaginatedResult<Payment>) => ({
  ...data,
  results: data.results.map((payment) => ({
    ...payment,
    status: payment.paid ? 'Zapłacono' : 'Niezapłacono',
  })),
});

export const getUnitDisplay = (unit: string) => {
  switch (unit.toLowerCase()) {
    case 'm2':
    case 'm^2':
      return 'm²';
    case 'm3':
    case 'm^3':
      return 'm³';
    default:
      return unit;
  }
};
