import axios from 'axios';
import { GetToken } from './GetToken';

/**
 * The type `Payload` defines an object with three string properties for old password, new password 1,
 * and new password 2.
 * @param {string} old_password - The `old_password` property in the `Payload` type represents the
 * user's current or old password.
 * @param {string} new_password1 - The `new_password1` property in the `Payload` type represents the
 * new password that the user wants to set.
 * @param {string} new_password2 - The `new_password2` property in the `Payload` type represents the
 * confirmation of the new password. It is used to ensure that the user has entered the new password
 * correctly by requiring them to re-enter it. This helps prevent errors and ensures that the user has
 * correctly set their new password.
 */
type Payload = {
  old_password: string;
  new_password1: string;
  new_password2: string;
};

/**
 * The function `ChangePassword` is an asynchronous function that sends a POST request to change a
 * user's password using FormData and handles errors appropriately.
 * @param {Payload} payload - The `ChangePassword` function is an asynchronous function that takes in a
 * payload object with `old_password` and `new_password1` properties. It uses FormData to append these
 * values and then makes a POST request to the specified API endpoint for changing the password.
 * @returns The function `ChangePassword` is returning the data received from the API call if the
 * request is successful. If there is an error during the API call, it will return the error response.
 */
export const ChangePassword = async ({
  old_password,
  new_password1,
}: Payload) => {
  const formData = new FormData();
  formData.append('old_password', old_password);
  formData.append('new_password', new_password1);
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/auth/password_change/`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      },
    );
    console.log(data);
    return data;
  } catch (err: any) {
    console.log(err);
    throw err.response.data;
  }
};
