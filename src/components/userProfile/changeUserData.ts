import axios from 'axios';
import { GetToken } from '../../features/auth/GetToken';

const EditUserData = async (data: any) => {
  try {
    return await axios.patch(
      `${import.meta.env.VITE_APP_API_URL}/auth/users/current/`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      },
    );
  } catch (err: any) {
    throw err.response.data;
  }
};

export { EditUserData };
