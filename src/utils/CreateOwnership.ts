import axios from 'axios';
import { GetToken } from './GetToken';
import type { IOwnership } from '../types/ownershipTypes';

const CreateOwnership = async (formData: Partial<Omit<IOwnership, 'id'>>) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/hoas/ownerships/`,
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

export { CreateOwnership };
