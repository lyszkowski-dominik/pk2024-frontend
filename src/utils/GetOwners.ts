import type { GetOwnersData } from '../types/OwnersTypes';
import { GetToken } from './GetToken';

const GetOwners = async ({ role, hoaID, page }: GetOwnersData) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/auth/users?hoa=${hoaID}&role=${role}&page=${page}&page_size=10`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GetToken()}`
    }
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to fetch owners');
  }
};

export default GetOwners;