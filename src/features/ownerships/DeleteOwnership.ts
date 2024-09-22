import axios from 'axios';
import { GetToken } from '../auth/GetToken';

/**
 * The function `DeleteOwnership` asynchronously deletes an ownership record using an HTTP DELETE
 * request with appropriate headers and error handling.
 * @param {number} id - The `id` parameter in the `DeleteOwnership` function is the unique identifier
 * of the ownership record that you want to delete.
 * @returns The `DeleteOwnership` function is returning the data received from the API after
 * successfully deleting the ownership with the specified `id`. If an error occurs during the deletion
 * process, the function will return the response from the error.
 */
const DeleteOwnership = async (id: number) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_APP_API_URL}/hoas/ownerships/${id}/`,
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

export { DeleteOwnership };
