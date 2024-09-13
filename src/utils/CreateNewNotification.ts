import axios from 'axios';
import { GetToken } from './GetToken';

interface FormData {
  message: string;
  description: string;
  link: string;
  user: string;
  hoa: number;
}

const CreateNewNotification = async (data: FormData) => {
  try {
    const { data: responseData } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/notifications/notifications/`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      },
    );
    return responseData;
  } catch (err: any) {
    return err.response;
  }
};

export { CreateNewNotification };
