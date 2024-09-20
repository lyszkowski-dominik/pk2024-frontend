import axios from 'axios';
import { GetToken } from './GetToken';
import type { IMeterReading } from '../types/billingTypes';

const UpdateMeterReading = async (
  id: number,
  formData: Partial<IMeterReading>,
) => {
  try {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_APP_API_URL}/billings/meter_readings/${id}/`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      },
    );
    return data;
  } catch (err: any) {
    return err.response;
  }
};

export { UpdateMeterReading };
