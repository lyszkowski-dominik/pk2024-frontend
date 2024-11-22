import type { PropertiesRequest, Property } from './propertiesTypes';
import api from '../../services/axiosInstance';
import { ApiPaginatedResult } from '../../types/types';

/**
 * This function asynchronously fetches properties data based on the provided page, pageSize, and hoaId
 * using an API endpoint.
 * @param {PropertiesRequest}  - The `GetProperties` function is an asynchronous function that takes in
 * a `PropertiesRequest` object as its parameter.
 * @remarks
 * - `page` - represents the page number of the properties data to be fetched.
 * - `pageSize` - represents the number of properties data to be fetched per page.
 * - `hoaId` - represents the Homeowners Association (HOA) ID for which the properties are to be fetched.
 * @returns The function `GetProperties` is returning the data from the API response after making a GET
 * request to the specified endpoint with the provided parameters.
 */
const GetProperties = async ({ page, pageSize, hoaId }: PropertiesRequest) => {
  try {
    const response = await api.get(
      `/hoas/properties/?page=${page}&page_size=${pageSize}&hoa=${hoaId}`,
    );
    return response.data as ApiPaginatedResult<Property>;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetProperties;
