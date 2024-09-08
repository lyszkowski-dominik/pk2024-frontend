import axios from 'axios';
import { GetToken } from './GetToken';

const DeleteResolution = async (id: number) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_APP_API_URL}/resolutions/resolutions/${id}/`,
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

export { DeleteResolution };
