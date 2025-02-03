import axios from 'axios';
import { GetToken } from '../auth/GetToken';
import { OwnershipsRequest } from './ownershipTypes';
/**
 * The function `GetOwnerships` makes an asynchronous request to a specified API endpoint to retrieve
 * ownership data based on the provided page and page size.
 * @param {ListRequestProperty}  - The `GetOwnerships` function is an asynchronous function that fetches
 * ownership data from an API endpoint.
 * @remarks
 * - `page` - represents the page number of the ownership data to be fetched.
 * - `pageSize` - represents the number of ownership data to be fetched per page.
 * @returns The function `GetOwnerships` is returning the data received from the API endpoint
 * `${import.meta.env.VITE_APP_API_URL}/hoas/ownerships/?page=&page_size=` after
 * making a GET request with the specified headers including the Authorization token obtained from the
 * `GetToken()` function.
 */

const GetOwnerships = async ({ page, pageSize }: OwnershipsRequest) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/hoas/ownerships/?page=${page}&page_size=${pageSize}`,
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
    throw err.response.data;
  }
};

export default GetOwnerships;
