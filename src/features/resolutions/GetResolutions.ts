import api from '../../services/axiosInstance';
import type { ApiPaginatedResult } from '../../types/types';
import { GetResolutionsRequest, Resolution } from './resolutionsTypes';

const GetResolutions = async (params: GetResolutionsRequest) => {
  try {
    const response = await api.get(`/resolutions/resolutions`, { params });
    return response.data as ApiPaginatedResult<Resolution>;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetResolutions;
