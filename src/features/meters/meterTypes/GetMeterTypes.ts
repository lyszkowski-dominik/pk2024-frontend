import api from '../../../services/axiosInstance';
import { ApiPaginatedResult } from '../../../types/types';
import { GetMeterTypesRequest, MeterType } from '../metersApiTypes';

const GetMeterTypes = async ({
  hoaId,
  isActive,
  page,
  pageSize,
}: GetMeterTypesRequest) => {
  try {
    const response = await api.get(
      `/billings/meter-types/?hoa=${hoaId}&page=${page}&page_size=${pageSize}${isActive !== undefined ? `&active=${isActive}` : ''}`,
    );
    return response.data as ApiPaginatedResult<MeterType>;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetMeterTypes;
