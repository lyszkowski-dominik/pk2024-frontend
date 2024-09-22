import axios from 'axios';
import { GetToken } from '../auth/GetToken';

/**
 * The function `GetBillingById` asynchronously fetches billing information by ID from an API using
 * Axios in TypeScript.
 * @param {number} id - The `id` parameter in the `GetBillingById` function is a number that represents
 * the unique identifier of a billing record that you want to retrieve from the API.
 * @returns The `GetBillingById` function is returning the data received from the API response after
 * fetching billing information by ID.
 */
export const GetBillingById = async (id: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/billings/bills/${id}/`,
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

export default GetBillingById;
