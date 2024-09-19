import axios from 'axios';
import { GetToken } from './GetToken';

/**
 * The `FormData` interface defines the structure of the data required to create a new resolution.
 * @property {string} title - The `title` property in the `FormData` interface represents the title of the resolution.
 * @property {string} description - The `description` property in the `FormData` interface represents the description of the resolution.
 * @property {string} start_date - The `start_date` property in the `FormData` interface represents the start date of the resolution.
 * @property {string} end_date - The `end_date` property in the `FormData` interface represents the end date of the resolution.
 * @property {number} hoa - The `hoa` property in the `FormData` interface represents the Homeowners Association (HOA) number associated with the resolution.
 */
interface FormData {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  hoa: number;
}

/**
 * The function `CreateNewResolution` sends a POST request to a specified API endpoint with form data
 * and returns the response data or error response.
 * @param {FormData} data - The `CreateNewResolution` function is an asynchronous function that takes a
 * `FormData` object as its parameter. The function sends a POST request to a specific API endpoint to
 * create a new resolution. The `data` parameter contains the necessary information for creating the
 * resolution, such as email, first name,
 * @returns The `CreateNewResolution` function is returning the response data from the API call if the
 * request is successful. If there is an error during the API call, it will return the error response.
 */
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