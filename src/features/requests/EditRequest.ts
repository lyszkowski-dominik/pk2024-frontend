import axios from 'axios';
import { GetToken } from '../auth/GetToken';

/**
 * The `EditRequest` function is an asynchronous function in TypeScript that sends a PATCH request to
 * update a specific request using axios with error handling.
 * @param {number} id - The `id` parameter in the `EditRequest` function is a number representing the
 * identifier of the request that needs to be edited.
 * @param {any} data - The `data` parameter in the `EditRequest` function represents the information
 * that you want to update for a specific request identified by the `id`. This data should be in the
 * form of an object containing the updated values for the request attributes that you want to modify.
 * @returns The EditRequest function is returning either the response data from the PATCH request if
 * successful, or the error response if there was an error during the request.
 */
const EditRequest = async (id: number, data: any) => {
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_APP_API_URL}/requests/requests/${id}/`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      },
    );
    return res;
  } catch (err: any) {
    return err.response;
  }
};

export { EditRequest };
