import api from '../../services/axiosInstance';

/**
 * The `SendPayment` function sends a payment request to a specific billing endpoint using an
 * authorization token.
 * @param {number} id - The `id` parameter in the `SendPayment` function is a number that represents
 * the unique identifier of a billing bill that needs to be paid.
 * @returns The `SendPayment` function is returning the response from the POST request made to the API
 */
const SendPayment = async (id: number) => {
  try {
    const { data } = await api.post(`/billings/bills/${id}/pay/`, {});
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default SendPayment;
