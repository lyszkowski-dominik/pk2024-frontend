import type { ApiPaginatedResult } from '../../types/types';
import api from '../../services/axiosInstance';
import { Adjustment, GetAdjustmentsRequest } from './adjustmentsTypes';

const GetAdjustments = async ({
  propertyId,
  hoaId,
  page,
  pageSize,
  day,
  month,
  year,
  order_by = '-start_month',
}: GetAdjustmentsRequest) => {
  try {
    const response = await api.get(
      `/billings/adjustments/?page=${page}&page_size=${pageSize}${propertyId !== undefined ? `&property=${propertyId}` : ''}${hoaId !== undefined ? `&hoa=${hoaId}` : ''}${day !== undefined ? `&day=${day}` : ''}${month !== undefined ? `&month=${month}` : ''}${year !== undefined ? `&year=${year}` : ''}&order_by=["${order_by}"]`,
    );
    return response.data as ApiPaginatedResult<Adjustment>;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetAdjustments;
