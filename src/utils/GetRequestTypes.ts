import type { GetRequestTypesData } from '../types/reqeustTypes';
import { GetToken } from './GetToken';

const GetRequestTypes = async ({
  hoaID,
  page,
  pageSize,
}: GetRequestTypesData) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/requests/request_types?hoa=${hoaID}&page=${page}&page_size=${pageSize}`,
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
    throw new Error('Failed to fetch requests');
  }
};

export default GetRequestTypes;
