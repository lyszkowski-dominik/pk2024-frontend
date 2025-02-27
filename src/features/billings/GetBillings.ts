import type { ApiPaginatedResult } from '../../types/types';
import { Billing, GetBillingsRequest } from './billingTypes';
import api from '../../services/axiosInstance';

const GetBillings = async ({
  propertyId,
  hoaId,
  page,
  pageSize,
  day,
  month,
  year,
  order_by = '-month',
}: GetBillingsRequest) => {
  try {
    const response = await api.get(
      `/billings/bills/?page=${page}&page_size=${pageSize}${propertyId !== undefined ? `&property=${propertyId}` : ''}${hoaId !== undefined ? `&hoa=${hoaId}` : ''}${day !== undefined ? `&day=${day}` : ''}${month !== undefined ? `&month=${month}` : ''}${year !== undefined ? `&year=${year}` : ''}&order_by=["${order_by}"]`,
    );
    return response.data as ApiPaginatedResult<Billing>;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetBillings;
