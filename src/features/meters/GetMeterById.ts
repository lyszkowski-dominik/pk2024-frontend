import axios from 'axios';
import { GetToken } from '../auth/GetToken';

export const GetMeterById = async (id: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/billings/meters/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      },
    );

    return response;
  } catch (err: any) {
    console.log(err);
  }
};

export default GetMeterById;
