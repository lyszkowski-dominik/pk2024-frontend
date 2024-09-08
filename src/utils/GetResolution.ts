import type { GetResolutionData } from '../types/resolutionTypes';
import { GetToken } from './GetToken';

const GetResolution = async ({ id }: GetResolutionData) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/resolutions/resolutions/${id}/`,
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
    throw new Error('Failed to fetch resolutions');
  }
};

export default GetResolution;
