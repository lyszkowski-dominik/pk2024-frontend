import api from '../../../services/axiosInstance';
import { Meter } from '../metersApiTypes';

const CreateMeter = async (formData: Partial<Meter>) => {
  try {
    const { data } = await api.post(`/billings/meters/`, formData);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { CreateMeter };
