import api from '../../services/axiosInstance';
import { Adjustment } from '../adjustments/adjustmentsTypes';
import { RatesSet } from './ratesTypes';

const GetAdjustmentRates = async ({
  hoaId,
  endDate,
}: {
  hoaId: number;
  endDate: string;
}) => {
  try {
    const response = await api.get(
      `/billings/rates/adjustment/?${hoaId! ? `&hoa=${hoaId}` : ''}&end_date=${endDate}`,
    );
    return response.data as {
      rates: RatesSet[];
      last_group_adjustment: Partial<Adjustment>;
    };
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetAdjustmentRates;
