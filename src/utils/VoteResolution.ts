import axios from 'axios';
import type { VoteResolutionData } from '../types/resolutionTypes';
import { GetToken } from './GetToken';

/**
 * The function `VoteResolution` sends a POST request to a specific API endpoint to vote on a
 * resolution with the provided choice.
 * @param {VoteResolutionData}  params - The `VoteResolution` function is an asynchronous function that takes
 * an object as a parameter with properties `id` and `choice`.
 * @remarks
 * - `id` - represents the unique identifier of the resolution to vote on.
 * - `choice` - represents the choice made by the user when voting on the resolution.
 * @returns The `VoteResolution` function is returning the response from the axios POST request if
 * successful, and if there is an error, it is returning the response from the error object.
 */
const VoteResolution = async ({ id, choice }: VoteResolutionData) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/resolutions/resolutions/${id}/vote/`,
      { choice },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      },
    );
    return res;
  } catch (err: any) {
    return err.response;
  }
};

export { VoteResolution };
