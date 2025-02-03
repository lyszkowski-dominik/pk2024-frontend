import axios from 'axios';

interface FormData {
  email: string;
}
/**
 * The function `ResetPasswordEmail` sends a POST request to a password reset endpoint with the
 * provided email address and returns the response data or error.
 * @param {string} email - The `ResetPasswordEmail` function is an asynchronous function that sends a
 * POST request to a password reset endpoint. It takes an email address as a parameter and
 * sends it in the request body using FormData.
 * @returns The function `ResetPasswordEmail` is returning the response data from the API call if the
 * call is successful. If there is an error during the API call, it will return the error response.
 */
export const ResetPasswordEmail = async ({ email }: FormData) => {
  const formData = new FormData();
  formData.append('email', email);
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/auth/password_reset/`,
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
    throw err.response.data;
    throw err.response.data;
  }
};
