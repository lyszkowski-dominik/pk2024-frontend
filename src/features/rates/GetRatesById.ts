import api from '../../services/axiosInstance';
import { RatesSet } from './ratesTypes';

const GetRatesById = async (id: number) => {
  try {
    const { data } = await api.get(`/billings/rates/${id}`);
    return data as RatesSet;
  } catch (err: any) {
    throw err.response.data;
  }
};
export { GetRatesById };
