import axios from 'axios';
import { GetToken } from './GetToken';
import type { IMeterReading } from '../types/billingTypes';

const CreateMeterReading = async (
  formData: Partial<Omit<IMeterReading, 'id'>>,
) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/billings/meters/`,
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

export { CreateMeterReading };
