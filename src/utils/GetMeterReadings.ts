import axios from 'axios';
import { GetToken } from './GetToken';
import type { ListRequest } from '../types/types';

const GetMeterReadings = async ({
  page,
  pageSize,
  propertyId,
}: ListRequest) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/billings/meter_readings/?page=${page}&page_size=${pageSize}&property=${propertyId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      },
    );

    return response.data;
  } catch (err: any) {
    console.log(err);
  }
};

export default GetMeterReadings;
