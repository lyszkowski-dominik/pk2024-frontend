import axios from 'axios';
import { GetToken } from './GetToken';
import type { Property } from '../types/propertiesTypes';

const CreateProperty = async (formData: Omit<Property, 'id'>) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/hoas/properties/`,
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

export { CreateProperty };
