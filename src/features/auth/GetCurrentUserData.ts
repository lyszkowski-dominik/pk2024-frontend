import api from '../../services/axiosInstance';
import { User } from '../users/usersTypes';

/**
 * This function retrieves user data from an API endpoint using an authorization token.
 * @returns The `GetUserData` function is returning the data fetched after making a GET request with the necessary
 * headers including the Authorization token obtained from the `GetToken()` function. If the request is
 * successful, the data is returned. If there is an error during the request, the error is logged to
 * the console.
 */
export const GetCurrentUserData = async () => {
  try {
    const { data } = await api.get(`/auth/current/`);
    return data as User;
  } catch (err: any) {
    throw err.response.data;
  }
};
