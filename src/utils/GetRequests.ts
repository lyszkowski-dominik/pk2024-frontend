import type { GetRequestsData } from '../types/reqeustTypes';
import { GetToken } from './GetToken';

const GetRequests = async ({
  hoaID,
  page,
  pageSize,
  state,
  assignedToMe,
}: GetRequestsData) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/requests/requests?hoa=${hoaID}&page=${page}&page_size=${pageSize}${state ? '&state=' + state : ''}${assignedToMe ? '&assigned_to_me=' + assignedToMe : ''}`,
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

export default GetRequests;
