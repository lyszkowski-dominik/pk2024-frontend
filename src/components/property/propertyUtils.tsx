import { MeterType, RateType } from '../../features/billings/billingTypes';

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

export const getMeterType = (meterType: MeterType) => {
  switch (meterType) {
    case MeterType.cold_water:
      return 'Licznik zimnej wody';
    case MeterType.hot_water:
      return 'Licznik ciepłej wody';
    default:
      return '';
  }
};
