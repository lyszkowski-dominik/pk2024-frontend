import type { GetResolutionData } from './resolutionTypes';
import { GetToken } from '../auth/GetToken';

/**
 * The function `GetResolution` asynchronously fetches resolution data from an API using a provided ID.
 * @param {GetResolutionData}  - The `GetResolution` function is an asynchronous function that fetches
 * resolution data from an API endpoint. It takes an object as a parameter with a property `id` of type
 * `GetResolutionData`.
 * @returns The `GetResolution` function is returning a Promise that resolves to the JSON data if the
 * response is successful (status code 200-299). If the response is not successful, it throws an error
 * with the message 'Failed to fetch resolutions'.
 */
const GetResolution = async ({ id }: GetResolutionData) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/resolutions/resolutions/${id}/`,
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
    throw new Error('Failed to fetch resolutions');
  }
};

export default GetResolution;
