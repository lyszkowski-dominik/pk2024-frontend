import axios from 'axios';
import { GetToken } from './GetToken';

export const GetOwnershipById = async (id: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/hoas/ownerships/${id}`,
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

export default GetOwnershipById;
