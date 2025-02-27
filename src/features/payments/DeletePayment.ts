import api from '../../services/axiosInstance';

const DeletePayment = async (id: number) => {
  try {
    const { data } = await api.delete(`/payments/payments/${id}`);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { DeletePayment };
