import api from '../../services/axiosInstance';
import { Ownership } from './ownershipTypes';

const EditOwnership = async (editedData: Partial<Ownership>) => {
  try {
    const { data } = await api.patch(
      `/hoas/ownerships/${editedData.id}/`,
      editedData,
    );
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { EditOwnership };
