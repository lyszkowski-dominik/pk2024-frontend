import { Ownership } from './ownershipTypes';
import api from '../../services/axiosInstance';

const CreateOwnership = async (formData: Partial<Ownership>) => {
  try {
    const { data } = await api.post(`/hoas/ownerships/`, formData);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { CreateOwnership };
