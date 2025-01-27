import type { MeterReading } from '../../billings/billingTypes';
import api from '../../../services/axiosInstance';

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
