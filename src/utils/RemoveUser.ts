import axios from 'axios';
import { GetToken } from './GetToken';

interface Props {
  id: Number;
}

const RemoveUser = async ({ id }: Props) => {
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