import api from '../../services/axiosInstance';

const DeleteAdjustment = async (id: number) => {
  try {
    const { data } = await api.delete(`/billings/adjustments/${id}`);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { DeleteAdjustment };
