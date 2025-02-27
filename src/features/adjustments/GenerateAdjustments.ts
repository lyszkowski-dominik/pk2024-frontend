import api from '../../services/axiosInstance';
import { RatesSet } from '../rates/ratesTypes';

const GenerateAdjustments = async ({
  date,
  hoaId,
  rates,
}: {
  date: string;
  hoaId: number;
  rates: RatesSet;
}) => {
  try {
    const { data } = await api.post(`/hoas/properties/generate_adjustments/`, {
      hoa: hoaId,
      date: date,
      rates: rates,
    });
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GenerateAdjustments;
