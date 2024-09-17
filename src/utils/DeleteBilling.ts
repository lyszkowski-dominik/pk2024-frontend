import axios from 'axios';
import { GetToken } from './GetToken';

const DeleteBilling = async (id: number) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_APP_API_URL}/billings/bills/${id}/`,
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

export { DeleteBilling };
