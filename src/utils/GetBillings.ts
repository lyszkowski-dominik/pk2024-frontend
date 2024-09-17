import axios from 'axios';
import { GetToken } from './GetToken';
import type { ListRequest } from '../types/types';

const GetBillings = async ({ page, pageSize }: ListRequest) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/billings/bills/?page=${page}&page_size=${pageSize}`,
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

export default GetBillings;
