import axios from 'axios';
import { GetToken } from '../auth/GetToken';
import type { IOwnership } from './ownershipTypes';

/**
 * The function `CreateOwnership` sends a POST request to a specific API endpoint with form data and
 * returns the response data or error response.
 * @param formData - The `formData` parameter in the `CreateOwnership` function is a partial object of
 * type `IOwnership` with the `id` property omitted. It is used to send data to the API endpoint for
 * creating a new ownership record.
 * @returns The function `CreateOwnership` is returning the data received from the POST request if
 * successful. If there is an error, it is returning the response from the error.
 */
const CreateOwnership = async (formData: Partial<Omit<IOwnership, 'id'>>) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/hoas/ownerships/`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      },
    );
    return data;
  } catch (err: any) {
    return err.response;
  }
};

export { CreateOwnership };
