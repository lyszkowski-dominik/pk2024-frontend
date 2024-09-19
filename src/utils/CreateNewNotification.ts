import axios from 'axios';
import { GetToken } from './GetToken';

/**
 * The `FormData` interface defines the structure of the data required to create a new notification.
 * @property {string} message - The `message` property in the `FormData` interface represents the message of the notification.
 * @property {string} description - The `description` property in the `FormData` interface represents the description of the notification.
 * @property {string} link - The `link` property in the `FormData` interface represents the link associated with the notification.
 * @property {number} hoa - The `hoa` property in the `FormData` interface represents the Homeowners Association (HOA) number associated with the notification.
 */
export interface FormData {
  message: string;
  description: string;
  link: string;
  hoa: number;
}

/**
 * The function `CreateNewNotification` sends a POST request to a specified API endpoint with form data
 * and returns the response data or error response.
 * @param {FormData} data - The `CreateNewNotification` function takes a `FormData` object as a
 * parameter. 
 * @returns The `CreateNewNotification` function is returning the response data from the POST request
 * if the request is successful. If there is an error, it will return the response object from the
 * error.
 */
const CreateNewNotification = async (data: FormData) => {
  try {
    const { data: responseData } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/notifications/notifications/`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      },
    );
    return responseData;
  } catch (err: any) {
    return err.response;
  }
};

export { CreateNewNotification };
