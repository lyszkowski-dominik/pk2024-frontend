import type { GetUsersData } from '../types/UsersTypes';
import { GetToken } from './GetToken';

/**
 * The function `GetOwners` makes an asynchronous request to fetch a list of owners based on specified
 * parameters.
 * @param {GetUsersData}  - The `GetOwners` function is an asynchronous function that fetches a list
 * of owners based on the provided parameters. Here's a breakdown of the parameters:
 * @remarks
 * - `role` - The `role` property in the `GetOwnersData` object represents the role of the owners to be fetched.
 * - `hoaID` - The `hoaID` property in the `GetOwnersData` object represents the Homeowners Association (HOA) ID for which the owners are to be fetched.
 * - `page` - The `page` property in the `GetOwnersData` object represents the page number of the owners to be fetched.
 * @returns The `GetOwners` function is returning a Promise that resolves to the JSON data fetched from
 * the API endpoint specified in the `fetch` call. If the response is successful (status code 200), it
 * returns the JSON data using `response.json()`. If there is an error during the fetch operation or
 * the response status is not ok, it throws an error with the message 'Failed to fetch owners
 */
const GetUsers = async ({ role, hoaID, page }: GetUsersData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/auth/users?hoa=${hoaID}&role=${role}&page=${page}&page_size=10`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      },
    );
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch owners');
    }
  } catch (err) {
    return {};
  }
};

export default GetUsers;
