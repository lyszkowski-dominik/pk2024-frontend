import type { GetRequestsData } from '../types/reqeustTypes';
import { GetToken } from './GetToken';

/**
 * The function `GetRequests` makes an asynchronous GET request to a specified API endpoint with
 * parameters for HOA ID, page, page size, state, and assignedToMe.
 * @param {GetRequestsData}  - The `GetRequests` function is an asynchronous function that fetches
 * requests based on the provided parameters. Here is an explanation of the parameters:
 * @remarks
 * - `hoaID` - The `hoaID` property in the `GetRequestsData` object represents the Homeowners Association (HOA) ID for which the requests are to be fetched.
 * - `page` - The `page` property in the `GetRequestsData` object represents the page number of the requests to be fetched.
 * - `pageSize` - The `pageSize` property in the `GetRequestsData` object represents the number of requests to be fetched per page.
 * - `state` - The `state` property in the `GetRequestsData` object represents the state of the requests to be fetched.
 * - `assignedToMe` - The `assignedToMe` property in the `GetRequestsData` object represents whether the requests are assigned to the current user.
 * @returns The `GetRequests` function is returning the result of the `response.json()` method if the
 * response from the API is successful (status code 200). If the response is not successful, it throws
 * an error with the message 'Failed to fetch requests'.
 */
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
