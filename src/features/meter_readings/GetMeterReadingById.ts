import axios from 'axios';
import { GetToken } from '../auth/GetToken';

export const GetMeterReadingById = async (id: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/billings/meter_readings/${id}`,
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

export default GetMeterReadingById;
