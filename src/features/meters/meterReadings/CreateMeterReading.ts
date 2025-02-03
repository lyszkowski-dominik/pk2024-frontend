import api from '../../../services/axiosInstance';
import { MeterReading } from '../metersApiTypes';

const CreateMeterReading = async (
  formData: Partial<Omit<MeterReading, 'id'>>,
) => {
  try {
    const { data } = await api.post(`/billings/meter_readings/`, formData);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { CreateMeterReading };
