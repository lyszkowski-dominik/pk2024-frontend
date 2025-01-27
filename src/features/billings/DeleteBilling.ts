import api from '../../services/axiosInstance';

const DeleteBilling = async (id: number) => {
  try {
    const { data } = await api.delete(`/billings/bills/${id}`);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { DeleteBilling };
