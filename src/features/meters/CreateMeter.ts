import type { IMeter } from '../billings/billingTypes';
import api from '../../services/axiosInstance';

const CreateMeter = async (formData: Partial<Omit<IMeter, 'id'>>) => {
  try {
    const { data } = await api.post(`/billings/meters/`, formData);
    return data;
  } catch (err: any) {
    return err.response.data;
  }
};

export { CreateMeter };
