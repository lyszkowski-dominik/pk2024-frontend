import { GetToken } from '../auth/GetToken';
import type { IOwnership } from './ownershipTypes';
import api from '../../services/axiosInstance';

const EditOwnership = async (id: number, formData: Partial<IOwnership>) => {
  try {
    const { data } = await api.patch(`/hoas/ownerships/${id}/`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GetToken()}`,
      },
    });
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { EditOwnership as UpdateOwnership };
