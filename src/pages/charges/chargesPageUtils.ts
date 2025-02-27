export enum ChargesTab {
  Rates = 'rates',
  Billings = 'billings',
  Adjustments = 'adjustments',
  Payments = 'payments',
  Balance = 'balance',
  Meters = 'meters',
  Readings = 'readings',
}

export const getTabName = (tab: ChargesTab): string => {
  switch (tab) {
    case ChargesTab.Billings:
      return 'Rachunki';
    case ChargesTab.Adjustments:
      return 'Korekty';
    case ChargesTab.Payments:
      return 'Płatności';
    case ChargesTab.Balance:
      return 'Salda';
    case ChargesTab.Meters:
      return 'Liczniki';
    case ChargesTab.Rates:
      return 'Stawki';
    case ChargesTab.Readings:
      return 'Odczyty';
  }
};
