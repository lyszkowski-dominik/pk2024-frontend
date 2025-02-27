import api from '../../services/axiosInstance';
import { Billing } from './billingTypes';

export const GetBillingById = async (id: number) => {
  try {
    const response = await api.get(`/billings/bills/${id}`);
    return response.data as Billing;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetBillingById;
