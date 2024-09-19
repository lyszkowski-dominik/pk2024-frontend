import axios from 'axios';
import { GetToken } from './GetToken';
import type { Property } from '../types/propertiesTypes';

/**
 * The function `CreateProperty` sends a POST request to a specified API endpoint with form data and
 * returns the response data or error response.
 * @param formData - An object containing data for creating a new property, with the 'id' property
 * excluded.
 * @returns The `CreateProperty` function is returning the data received from the POST request if the
 * request is successful. If there is an error, it will return the response from the error.
 */
const CreateProperty = async (formData: Omit<Property, 'id'>) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/hoas/properties/`,
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

export { CreateProperty };
