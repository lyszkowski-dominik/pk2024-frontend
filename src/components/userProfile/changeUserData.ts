import axios from 'axios';
import { GetToken } from '../../features/auth/GetToken';


const EditUserData = async (id: number, data: any) => {
  try {
    return await axios.patch(
      `${import.meta.env.VITE_APP_API_URL}/auth/users/${id}/`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      },
    );
  } catch (err: any) {
    return err.response;
  }
};

export { EditUserData };
