import type { User } from './usersTypes';
import api from '../../services/axiosInstance';
import type { UserRole } from '../../types/types';

interface IParams {
  user: Partial<User>;
  role: UserRole;
  hoa: number;
}

const CreateNewUser = async ({ user, role, hoa }: IParams) => {
  const { first_name, last_name, email } = user;

  try {
    const { data } = await api.post(`/auth/users/`, {
      first_name,
      last_name,
      email,
      role,
      hoa,
    });
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { CreateNewUser };
