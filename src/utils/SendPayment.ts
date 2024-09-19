import axios from 'axios';
import { GetToken } from './GetToken';

/**
 * The `SendPayment` function sends a payment request to a specific billing endpoint using an
 * authorization token.
 * @param {number} id - The `id` parameter in the `SendPayment` function is a number that represents
 * the unique identifier of a billing bill that needs to be paid.
 * @returns The `SendPayment` function is returning the response from the POST request made to the API
 */
const SendPayment = async (id: number) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/billings/bills/${id}/pay/`,
      {},
      {
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

export default SendPayment;
