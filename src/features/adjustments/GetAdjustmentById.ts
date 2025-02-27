import api from '../../services/axiosInstance';
import { Adjustment } from './adjustmentsTypes';

export const GetAdjustmentById = async (id: number) => {
  try {
    const response = await api.get(`/billings/adjustments/${id}`);
    return response.data as Adjustment;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetAdjustmentById;
