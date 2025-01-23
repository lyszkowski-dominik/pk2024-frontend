import type { PropertiesRequest, Property } from './propertiesTypes';
import api from '../../services/axiosInstance';
import { ApiPaginatedResult } from '../../types/types';

const GetProperties = async ({ page, pageSize, hoaId }: PropertiesRequest) => {
  try {
    const response = await api.get(
      `/hoas/properties/?page=${page}&page_size=${pageSize}&hoa=${hoaId}`,
    );
    return response.data as ApiPaginatedResult<Property>;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetProperties;
