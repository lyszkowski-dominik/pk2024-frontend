import type { Property } from './propertiesTypes';
import api from '../../services/axiosInstance';

/**
 * The function `CreateProperty` sends a POST request to a specified API endpoint with form data and
 * returns the response data or error response.
 * @param formData - An object containing data for creating a new property, with the 'id' property
 * excluded.
 * @returns The `CreateProperty` function is returning the data received from the POST request if the
 * request is successful. If there is an error, it will return the response from the error.
 */
const CreateProperty = async (formData: Partial<Property>) => {
  try {
    const { data } = await api.post(`/hoas/properties/`, formData);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { CreateProperty };
