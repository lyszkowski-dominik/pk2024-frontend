import axios from 'axios';
import { GetToken } from './GetToken';

interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  hoa: number;
}

const CreateNewUser = async ( data: FormData) => {
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('first_name', data.first_name);
  formData.append('last_name', data.last_name);
  if (data.role === 'admin') {
    formData.append('is_staff', 'true');
  } else {
    formData.append('role', data.role);
    formData.append('hoa', data.hoa.toString());
  }
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/auth/users/`,
      formData,
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

export { CreateNewUser };