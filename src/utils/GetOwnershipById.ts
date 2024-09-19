import axios from 'axios';
import { GetToken } from './GetToken';

/**
 * This TypeScript function asynchronously fetches ownership data by ID from an API using axios with
 * error handling.
 * @param {number} id - The `id` parameter in the `GetOwnershipById` function is a number that
 * represents the unique identifier of the ownership record you want to retrieve from the API.
 * @returns The `GetOwnershipById` function is returning the response from the API call made using
 * axios.
 */
export const GetOwnershipById = async (id: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/hoas/ownerships/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      },
    );

    return response;
  } catch (err: any) {
    console.log(err);
  }
};

export default GetOwnershipById;
