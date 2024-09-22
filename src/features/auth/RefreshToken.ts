import axios from 'axios';

/**
 * The function RefreshToken sends a request to refresh a user's token, handling errors and updating
 * the token data accordingly.
 * @returns The `RefreshToken` function is returning the data object received from the axios POST
 * request if successful. If there is an error during the request, it will throw an error message based
 * on the response data or a custom error message if the data object contains an error property.
 */
export const RefreshToken = async () => {
  const formData = new FormData();
  const refreshToken = localStorage.getItem('refreshToken');
  formData.append('refresh', `${refreshToken}`);
  let customError = false;
  try {
    // TRY TO MAKE REQUEST
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/auth/token/refresh/`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (data.error) {
      customError = true;
      throw new Error(data.message);
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.setItem(
      'accessToken',
      data.access
    );
    localStorage.setItem(
      'refreshToken',
      data.refresh
    );
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (customError) {
      throw new Error(err.message);
    }
    throw new Error(
      `Problem refreshing token data: ${err.response.data.message}`
    );
  }
};
