import api from '../../../services/axiosInstance';

const DeleteMeter = async (id: number) => {
  try {
    const { data } = await api.delete(`/billings/meters/${id}/`);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { DeleteMeter };
