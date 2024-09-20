import axios from 'axios';
import { GetToken } from './GetToken';
import type { IMeter } from '../types/billingTypes';

const CreateMeter = async (formData: Partial<Omit<IMeter, 'id'>>) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/billings/meter_readings/`,
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

export { CreateMeter };
