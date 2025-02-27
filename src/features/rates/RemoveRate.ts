import api from '../../services/axiosInstance';

const RemoveRate = async (rateId: number) => {
  try {
    const { data } = await api.delete(`/billings/rates/${rateId}`);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};
export { RemoveRate };
