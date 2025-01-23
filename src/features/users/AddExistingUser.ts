 import type { UserRole } from '../../types/types';
import api from '../../services/axiosInstance';

const AddExistingUser = async ({
  role,
  hoaId,
  userId,
}: {
  role: UserRole;
  hoaId: number;
  userId: number;
}) => {
  try {
    const response = await api.post(`/hoas/hoas/${hoaId}/users/`, {
      user: userId,
      role: role,
    });
    return response.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export default AddExistingUser;
