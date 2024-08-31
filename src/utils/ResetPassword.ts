import axios from 'axios';
import { GetToken } from './GetToken';

type Payload = {
  uidb64: string;
  token: string;
  new_password1: string;
  new_password2: string;
};

export const ResetPassword = async ({
  uidb64,
  token,
  new_password1,
}: Payload) => {
  const formData = new FormData();
  formData.append('new_password', new_password1);

  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/auth/reset/${uidb64}/${token}/`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(data);
    return data;
  } catch (err: any) {
    console.log(err);
    return err.response;
  }
};
