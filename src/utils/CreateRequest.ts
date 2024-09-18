import axios from 'axios';
import { GetToken } from './GetToken';

const CreateRequest = async (formData: any) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/requests/requests/`,
      formData,
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

export { CreateRequest };
