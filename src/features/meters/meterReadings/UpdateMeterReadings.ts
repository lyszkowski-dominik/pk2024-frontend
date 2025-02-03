import api from '../../../services/axiosInstance';
import { MeterReading } from '../metersApiTypes';

const UpdateMeterReading = async (formData: Partial<MeterReading>) => {
  try {
    const { data } = await api.patch(
      `/billings/meter_readings/${formData.id}/`,
      formData,
    );
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { UpdateMeterReading };
