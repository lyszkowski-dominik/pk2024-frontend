import api from '../../services/axiosInstance';
import { Ownership } from './ownershipTypes';

export const GetOwnershipById = async (id: number) => {
  try {
    const response = await api.get(`/hoas/ownerships/${id}`);

    return response.data as Ownership;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetOwnershipById;
