import api from '../../../services/axiosInstance';
import { ApiPaginatedResult } from '../../../types/types';
import { GetMetersRequest, Meter } from '../metersApiTypes';

const GetMeters = async ({
  propertyId,
  isActive,
  meterType,
  page,
  pageSize,
}: GetMetersRequest) => {
  try {
    const response = await api.get(
      `/billings/meters/?page=${page}&page_size=${pageSize}${propertyId! ? `&property=${propertyId}` : ''}${meterType! ? `&type=${meterType}` : ''}${isActive !== undefined ? `&active=${isActive}` : ''}`,
    );

    return response.data as ApiPaginatedResult<Meter>;
  } catch (err: any) {
    console.log(err);
  }
};

export default GetMeters;
