import axios from 'axios';
import { GetToken } from './GetToken';
import type { IMeter } from '../types/billingTypes';

const UpdateMeter = async (id: number, formData: Partial<IMeter>) => {
  try {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_APP_API_URL}/billings/meters/${id}/`,
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

export { UpdateMeter };
