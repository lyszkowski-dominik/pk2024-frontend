import api from '../../../services/axiosInstance';
import { MeterReading } from '../metersApiTypes';

export const GetMeterReadingById = async (id: number) => {
  try {
    const response = await api.get(`/billings/meter_readings/${id}`);

    return response.data as MeterReading;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetMeterReadingById;
