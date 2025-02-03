import api from '../../services/axiosInstance';
import { RatesSet } from './ratesTypes';

const UpdateRate = async (data: Partial<RatesSet>) => {
  try {
    const response = await api.patch(`/billings/rates/${data.id}/`, data);
    return response.data;
  } catch (err: any) {
    throw err.response.data;
  }
};
export { UpdateRate };
