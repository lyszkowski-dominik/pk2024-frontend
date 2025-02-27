import { ColumnDef, ColumnType } from '../../components/common/list/List';
import { Entry } from '../../features/adjustments/adjustmentsTypes';
import { Bill } from '../../features/billings/billingTypes';

export const columnsBilling: ColumnDef[] = [
  {
    name: 'name',
    label: 'Media',
    type: ColumnType.TEXT,
  },
  {
    name: 'units_consumed',
    label: 'Ilość',
    type: ColumnType.TEXT,
  },
  {
    name: 'unit',
    label: 'Jednostka',
    type: ColumnType.TEXT,
  },
  {
    name: 'rate_per_unit',
    label: 'Stawka',
    type: ColumnType.AMOUNT,
  },
  {
    name: 'total_amount',
    label: 'Wartość',
    type: ColumnType.AMOUNT,
  },
];

export const columnsAdjustment: ColumnDef[] = [
  {
    name: 'name',
    label: 'Media',
    type: ColumnType.TEXT,
  },
  {
    name: 'amount_paid',
    label: 'Naliczone',
    type: ColumnType.AMOUNT,
  },
  {
    name: 'units_consumed',
    label: 'Zużycie',
    type: ColumnType.TEXT,
  },
  {
    name: 'unit',
    label: 'Jednostka',
    type: ColumnType.TEXT,
  },
  {
    name: 'rate_per_unit',
    label: 'Stawka',
    type: ColumnType.AMOUNT,
  },
  {
    name: 'total_amount',
    label: 'Wartość',
    type: ColumnType.AMOUNT,
  },
];

export const getBillingData = (data: Bill[]) => {
  return data.map((bill) => ({
    ...bill,
    ...bill.rate,
    unit: getUnitDisplay(bill.rate.unit),
  }));
};

export const getAdjustmentData = (data: Entry[]) => {
  return data.map((entry) => ({
    ...entry,
    ...entry.rate,
    unit: getUnitDisplay(entry.rate.unit),
  }));
};

const getUnitDisplay = (unit: string) => {
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
