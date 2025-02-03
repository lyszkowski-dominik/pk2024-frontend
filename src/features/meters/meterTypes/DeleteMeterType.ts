import api from '../../../services/axiosInstance';

const DeleteMeterType = async (id: number) => {
  try {
    const response = await api.delete(`/billings/meter-types/${id}`);
    return response.data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default DeleteMeterType;
