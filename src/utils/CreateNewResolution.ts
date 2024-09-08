import axios from 'axios';
import { GetToken } from './GetToken';

interface FormData {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  hoa: number;
}

const CreateNewResolution = async ( data: FormData) => {
//   const formData = new FormData();
//   formData.append('email', data.email);
//   formData.append('first_name', data.first_name);
//   formData.append('last_name', data.last_name);
//   if (data.role === 'admin') {
//     formData.append('is_staff', 'true');
//   } else {
//     formData.append('role', data.role);
//     formData.append('hoa', data.hoa.toString());
//   }
  try {
    const { data: responseData } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/resolutions/resolutions/`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GetToken()}`
        }
      }
    );
    return responseData;
  } catch (err: any) {
    return err.response;
  }
};

export { CreateNewResolution };