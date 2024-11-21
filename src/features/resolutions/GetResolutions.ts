import api from '../../services/axiosInstance';
import type { ApiPaginatedResult } from '../../types/types';
import { GetResolutionsRequest, Resolution } from './resolutionsTypes';

const GetResolutions = async ({
  hoaId,
  page,
  pageSize,
}: GetResolutionsRequest) => {
  try {
    const response = await api.get(
      `/resolutions/resolutions/?hoa=${hoaId}&page=${page}&page_size=${pageSize}`,
    );
    return response.data as ApiPaginatedResult<Resolution>;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetResolutions;
