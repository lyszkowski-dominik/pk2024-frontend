import api from '../../services/axiosInstance';
import { RatesSet } from './ratesTypes';
const AddRate = async (data: Partial<RatesSet>) => {
  try {
    const response = await api.post(`/billings/rates/`, data);
    return response.data;
  } catch (err: any) {
    throw err.response.data;
  }
};
export { AddRate };
