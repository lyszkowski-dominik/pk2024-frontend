import api from '../../services/axiosInstance';
import { Request } from './requestTypes';

/**
 * The `EditRequest` function is an asynchronous function in TypeScript that sends a PATCH request to
 * update a specific request using axios with error handling.
 * @param {number} id - The `id` parameter in the `EditRequest` function is a number representing the
 * identifier of the request that needs to be edited.
 * @param {any} data - The `data` parameter in the `EditRequest` function represents the information
 * that you want to update for a specific request identified by the `id`. This data should be in the
 * form of an object containing the updated values for the request attributes that you want to modify.
 * @returns The EditRequest function is returning either the response data from the PATCH request if
 * successful, or the error response if there was an error during the request.
 */

type EditRequestParams = {
  id: number;
  editedData: Partial<Request>;
};

const EditRequest = async ({ id, editedData }: EditRequestParams) => {
  try {
    const res = await api.patch(`/requests/requests/${id}/`, editedData);
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export { EditRequest };
