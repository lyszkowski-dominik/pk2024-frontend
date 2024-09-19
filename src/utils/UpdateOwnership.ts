import axios from 'axios';
import { GetToken } from './GetToken';
import type { IOwnership } from '../types/ownershipTypes';

/**
 * The function `UpdateOwnership` sends a PATCH request to update ownership data using Axios.
 * @param {number} id - The `id` parameter in the `UpdateOwnership` function is a number that
 * represents the unique identifier of the ownership record that needs to be updated.
 * @param formData - The `formData` parameter in the `UpdateOwnership` function is of type
 * `Partial<IOwnership>`. This means it is an object that may contain some or all of the properties
 * defined in the `IOwnership` interface. It allows for updating only specific properties of an
 * ownership
 * @returns The `UpdateOwnership` function is returning the data received from the PATCH request if
 * successful. If there is an error, it will return the response from the error.
 */
const UpdateOwnership = async (id: number, formData: Partial<IOwnership>) => {
  try {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_APP_API_URL}/hoas/ownerships/${id}/`,
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

export { UpdateOwnership };
