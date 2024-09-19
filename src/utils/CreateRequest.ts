import axios from 'axios';
import { GetToken } from './GetToken';

/**
 * The function `CreateRequest` sends a POST request to a specified API endpoint with form data and
 * returns the response data or error response.
 * @param {any} formData - The `CreateRequest` function is an asynchronous function that sends a POST
 * request to a specified API endpoint with the provided `formData`. The `formData` parameter is an
 * object containing the data that will be sent in the request body.
 * @returns The `CreateRequest` function is returning the data received from the POST request if
 * successful, and if there is an error, it returns the response from the error.
 */
const CreateRequest = async (formData: any) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/requests/requests/`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      },
    );
    return data;
  } catch (err: any) {
    return err.response;
  }
};

export { CreateRequest };
