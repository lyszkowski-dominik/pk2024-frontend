import type { BuildingsRequest, PropertiesRequest } from './propertiesTypes';
import api from '../../services/axiosInstance';
import { ApiPaginatedResult } from '../../types/types';

const GetBuildings= async ({ page, pageSize, hoaId }: PropertiesRequest) => {
  try {
    const response = await api.get(
      `/hoas/buildings/?page=${page}&page_size=${pageSize}&hoa=${hoaId}`,
    );
    return response.data as ApiPaginatedResult<BuildingsRequest>;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetBuildings;
