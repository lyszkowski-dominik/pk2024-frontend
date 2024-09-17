import axios from 'axios';
import { GetToken } from './GetToken';

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
