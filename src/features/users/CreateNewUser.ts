import axios from 'axios';
import { GetToken } from '../auth/GetToken';


/**
 * The `FormData` interface defines the structure of the data required to create a new user.
 * @property {string} email - The `email` property in the `FormData` interface represents the email of the user.
 * @property {string} first_name - The `first_name` property in the `FormData` interface represents the first name of the user.
 * @property {string} last_name - The `last_name` property in the `FormData` interface represents the last name of the user.
 * @property {string} role - The `role` property in the `FormData` interface represents the role of the user.
 * @property {number} hoa - The `hoa` property in the `FormData` interface represents the Homeowners Association (HOA) number associated with the user.
 */
export interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  hoa: number;
}

/**
 * The function `CreateNewUser` asynchronously creates a new user by sending form data to an API
 * endpoint with appropriate headers and error handling.
 * @param {FormData} data - The `CreateNewUser` function is an asynchronous function that takes a
 * `FormData` object as a parameter. The `FormData` object contains information about a new user such
 * as email, first name, last name, role, and hoa (Homeowners Association).
 * @returns The `CreateNewUser` function is returning the data received from the POST request if
 * successful, and if there is an error, it returns the response from the error.
 */
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