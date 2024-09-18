import axios from 'axios';
import { GetToken } from './GetToken';

const EditRequest = async (id: number, data: any) => {
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_APP_API_URL}/requests/requests/${id}/`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      },
    );
    return res;
  } catch (err: any) {
    return err.response;
  }
};

export { EditRequest };
