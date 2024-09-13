import type { GetNotificationsData } from '../types/notificationTypes';
import { GetToken } from './GetToken';

const GetNotifications = async ({
  hoaID,
  page,
  pageSize,
}: GetNotificationsData) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/notifications/notifications?hoa=${hoaID}&page=${page}&page_size=${pageSize}`,
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
    throw new Error('Failed to fetch notifications');
  }
};

export default GetNotifications;
