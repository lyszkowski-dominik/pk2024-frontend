import { RateType } from '../../types/billingTypes';

export const getUnit = (rateType: RateType) => {
  switch (rateType) {
    case RateType.unit:
      return 'm3';
    case RateType.area:
      return 'm2';
    case RateType.effective_area:
      return 'm2';
    case RateType.person:
      return 'os.';
    case RateType.fixed:
      return '-';
    case RateType.property:
      return 'lok.';
    default:
      return '';
  }
};
