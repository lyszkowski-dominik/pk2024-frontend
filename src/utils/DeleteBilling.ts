import axios from 'axios';
import { GetToken } from './GetToken';

/**
 * The function `DeleteBilling` asynchronously deletes a billing record using an API endpoint and
 * returns the response data or error response.
 * @param {number} id - The `id` parameter in the `DeleteBilling` function is a number that represents
 * the unique identifier of the billing record that needs to be deleted.
 * @returns The `DeleteBilling` function is returning the data from the successful deletion request if
 * the deletion is successful. If there is an error during the deletion process, it will return the
 * response error.
 */
const DeleteBilling = async (id: number) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_APP_API_URL}/billings/bills/${id}/`,
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

export { DeleteBilling };
