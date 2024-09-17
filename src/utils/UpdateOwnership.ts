import axios from 'axios';
import { GetToken } from './GetToken';
import type { IOwnership } from '../types/ownershipTypes';

const UpdateOwnership = async (id: number, formData: Partial<IOwnership>) => {
  try {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_APP_API_URL}/hoas/ownerships/${id}/`,
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

export { UpdateOwnership };
