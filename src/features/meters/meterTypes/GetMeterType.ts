import api from '../../../services/axiosInstance';
import { MeterType } from '../metersApiTypes';

const GetMeterType = async (id: number) => {
  try {
    const response = await api.get(`/billings/meter-types/${id}`);
    return response.data as MeterType;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetMeterType;
