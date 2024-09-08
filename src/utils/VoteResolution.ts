import axios from 'axios';
import type { VoteResolutionData } from '../types/resolutionTypes';
import { GetToken } from './GetToken';

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
