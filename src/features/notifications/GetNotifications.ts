import type { GetNotificationsData } from '../notifications/notificationTypes';
import { GetToken } from '../auth/GetToken';

/**
 * The function `GetNotifications` fetches notifications based on the provided parameters
 * asynchronously.
 * @param {GetNotificationsData}  - The `GetNotifications` function is an asynchronous function that
 * fetches notifications from an API endpoint. It takes an object as a parameter with the following
 * properties:
 * @remarks
 * - `hoaID` - The `hoaID` property in the `GetNotificationsData` object represents the Homeowners Association (HOA) ID for which the notifications are to be fetched.
 * - `page` - The `page` property in the `GetNotificationsData` object represents the page number of the notifications to be fetched.
 * - `pageSize` - The `pageSize` property in the `GetNotificationsData` object represents the number of notifications to be fetched per page.
 * @returns The function `GetNotifications` is returning a Promise that resolves to the JSON data
 * fetched from the specified API endpoint if the response is successful (status code 200). If the
 * response is not successful, it throws an error with the message 'Failed to fetch notifications'.
 */
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
