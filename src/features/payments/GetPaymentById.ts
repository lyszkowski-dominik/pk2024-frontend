import api from '../../services/axiosInstance';
import { Payment } from './paymentsTypes';

export const GetPaymentById = async (id: number) => {
  try {
    const response = await api.get(`/payments/payments/${id}`);
    return response.data as Payment;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetPaymentById;
