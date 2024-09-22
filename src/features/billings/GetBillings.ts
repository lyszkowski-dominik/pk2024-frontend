import axios from 'axios';
import { GetToken } from '../auth/GetToken';
import type { ListRequest } from '../../types/types';

/**
 * The function `GetBillings` asynchronously fetches billing data from an API based on the provided
 * page and page size.
 * @param {ListRequest}  - The `GetBillings` function is an asynchronous function that fetches billing
 * data from an API endpoint. It takes a `ListRequest` object as a parameter with `page` and `pageSize`
 * properties.
 * @returns The function `GetBillings` is returning the data received from the API endpoint
 * `${import.meta.env.VITE_APP_API_URL}/billings/bills/?page=&page_size=` after
 * making a GET request with the specified page and pageSize parameters. If the request is successful,
 * it returns the response data. If there is an error during the request, it logs the error to the
 */
const GetBillings = async ({ page, pageSize }: ListRequest) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/billings/bills/?page=${page}&page_size=${pageSize}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      },
    );

    return response.data;
  } catch (err: any) {
    console.log(err);
  }
};

export default GetBillings;
