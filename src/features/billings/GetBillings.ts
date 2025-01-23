import type { ApiPaginatedResult } from '../../types/types';
import { GetBillingsRequest, IBilling } from './billingTypes';
import api from '../../services/axiosInstance';

/**
 * The function `GetBillings` asynchronously fetches billing data from an API based on the provided
 * page and page size.
 * @param {ListRequestProperty}  - The `GetBillings` function is an asynchronous function that fetches billing
 * data from an API endpoint. It takes a `ListRequest` object as a parameter with `page` and `pageSize`
 * properties.
 * @returns The function `GetBillings` is returning the data received from the API endpoint
 * `${import.meta.env.VITE_APP_API_URL}/billings/bills/?page=&page_size=` after
 * making a GET request with the specified page and pageSize parameters. If the request is successful,
 * it returns the response data. If there is an error during the request, it logs the error to the
 */
const GetBillings = async ({
  propertyId,
  page,
  pageSize,
}: GetBillingsRequest) => {
  try {
    const response = await api.get(
      `/billings/bills/?page=${page}&page_size=${pageSize}&property=${propertyId}&order_by=["-month"]`,
    );
    return response.data as ApiPaginatedResult<IBilling>;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetBillings;
