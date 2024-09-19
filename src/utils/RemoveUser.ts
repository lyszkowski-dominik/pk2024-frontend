import axios from 'axios';
import { GetToken } from './GetToken';


interface FormData {
  id:Number;
}
/**
 * The function `RemoveUser` is an asynchronous function that sends a DELETE request to a specified API
 * endpoint to remove a user by their ID.
 * @param {Number} id - The `id` parameter in the `RemoveUser` function is a Number type that
 * represents the unique identifier of the user to be removed from the system.
 * @returns The `RemoveUser` function is returning the data from the successful deletion request if the
 * deletion is successful. If there is an error during the deletion request, it will return the
 * response error.
 */
const RemoveUser = async ( { id }: FormData ) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_APP_API_URL}/auth/users/${id}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GetToken()}`
        }
      }
    );
    return data;
  } catch (err: any) {
    return err.response;
  }
};

export { RemoveUser };