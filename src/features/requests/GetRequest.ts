import type { GetRequestData } from './reqeustTypes';
import { GetToken } from '../auth/GetToken';

/**
 * The function `GetRequest` makes a GET request to a specific endpoint using the provided ID and
 * returns the response data if successful.
 * @param {GetRequestData}  - The `GetRequest` function is an asynchronous function that makes a GET
 * request to a specific endpoint using the `fetch` API. It takes an object as a parameter with a
 * property `id` of type `GetRequestData`.
 * @returns The `GetRequest` function is returning the JSON data from the response if the request is
 * successful (`response.ok` is true). If the request is not successful, it throws an error with the
 * message 'Failed to fetch request'.
 */
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
