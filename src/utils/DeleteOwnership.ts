import axios from 'axios';
import { GetToken } from './GetToken';

const DeleteOwnership = async (id: number) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_APP_API_URL}/hoas/ownerships/${id}/`,
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

export { DeleteOwnership };