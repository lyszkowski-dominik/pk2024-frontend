import type { GetRequestTypesData } from '../requests/reqeustTypes';
import { GetToken } from '../auth/GetToken';

/**
 * This function makes an asynchronous GET request to fetch request types based on the provided
 * parameters.
 * @param {GetRequestTypesData}  - The `GetRequestTypes` function is an asynchronous function that
 * makes a GET request to a specific API endpoint to fetch request types based on the provided
 * parameters.
 * @remarks
 * - `hoaID` - The `hoaID` property in the `GetRequestTypesData` object represents the Homeowners Association (HOA) ID for which the request types are to be fetched.
 * - `page` - The `page` property in the `GetRequestTypesData` object represents the page number of the request types to be fetched.
 * - `pageSize` - The `pageSize` property in the `GetRequestTypesData` object represents the number of request types to be fetched per page.
 * @returns The `GetRequestTypes` function is returning a Promise that resolves to the JSON response
 * from the API if the response is successful (status code 200-299). If the response is not successful,
 * it throws an error with the message 'Failed to fetch requests'.
 */
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
