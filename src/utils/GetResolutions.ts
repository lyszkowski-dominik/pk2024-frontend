import type { GetResolutionsData } from '../types/resolutionTypes';
import { GetToken } from './GetToken';

/**
 * The function `GetResolutions` makes an asynchronous request to fetch resolutions data based on the
 * provided HOA ID, page number, and page size.
 * @param {GetResolutionsData}  - The `GetResolutions` function is an asynchronous function that
 * fetches resolutions data from an API endpoint. Here are the parameters used in the function:
 * @returns The `GetResolutions` function is returning a Promise that resolves to the JSON data fetched
 * from the API endpoint specified in the `fetch` call. If the response is successful (status code
 * 200), it returns the JSON data using `response.json()`. If the response is not successful, it throws
 * an error with the message 'Failed to fetch resolutions'.
 */
const GetResolutions = async ({ hoaID, page, pageSize }: GetResolutionsData) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/resolutions/resolutions?hoa=${hoaID}&page=${page}&page_size=${pageSize}`,
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

export default GetResolutions;
