import api from '../../../services/axiosInstance';
import { Meter } from '../metersApiTypes';

export const GetMeterById = async (id: number) => {
  try {
    const response = await api.get(`/billings/meters/${id}`);

    return response.data as Meter;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetMeterById;
