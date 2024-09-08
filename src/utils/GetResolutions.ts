import type { GetResolutionsData } from '../types/resolutionTypes';
import { GetToken } from './GetToken';

const GetResolutions = async ({ hoaID, page, pageSize }: GetResolutionsData) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/resolutions/resolutions?hoa=${hoaID}&page=${page}&page_size=${pageSize}`,
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

export default GetResolutions;
