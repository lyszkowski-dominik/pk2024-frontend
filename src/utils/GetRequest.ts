import type { GetRequestData } from '../types/reqeustTypes';
import { GetToken } from './GetToken';

const GetRequest = async ({ id }: GetRequestData) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/requests/requests/${id}/`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GetToken()}`,
      },
    },
  );

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to fetch requesst');
  }
};

export default GetRequest;
