import api from '../../../services/axiosInstance';
import { MeterType } from '../metersApiTypes';

const CreateMeterType = async (params: Partial<MeterType>) => {
  try {
    const response = await api.post(`/billings/meter-types/`, params);
    return response.data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default CreateMeterType;
