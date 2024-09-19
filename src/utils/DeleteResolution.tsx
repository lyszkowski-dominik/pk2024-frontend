import axios from 'axios';
import { GetToken } from './GetToken';

/**
 * The function `DeleteResolution` is an asynchronous function that sends a DELETE request to a
 * specific resolution endpoint using Axios in a TypeScript React application.
 * @param {number} id - The `id` parameter in the `DeleteResolution` function is the unique identifier
 * of the resolution that you want to delete. It is used to specify which resolution should be deleted
 * from the API.
 * @returns The DeleteResolution function is returning either the response from the axios delete
 * request if successful, or the error response if there is an error.
 */
const DeleteResolution = async (id: number) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_APP_API_URL}/resolutions/resolutions/${id}/`,
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

export { DeleteResolution };
