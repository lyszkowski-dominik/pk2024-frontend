import type { ApiPaginatedResult } from '../../types/types';
import api from '../../services/axiosInstance';
import { GetPaymentsRequest, Payment } from './paymentsTypes';

const GetPayments = async ({
  propertyId,
  hoaId,
  page,
  pageSize,
  month,
  year,
  order_by = '-date',
}: GetPaymentsRequest) => {
  try {
    const response = await api.get(
      `/payments/payments/?page=${page}&page_size=${pageSize}${propertyId !== undefined ? `&property=${propertyId}` : ''}${hoaId !== undefined ? `&hoa=${hoaId}` : ''}${month !== undefined ? `&month=${month}` : ''}${year !== undefined ? `&year=${year}` : ''}&order_by=["${order_by}"]`,
    );
    return response.data as ApiPaginatedResult<Payment>;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetPayments;
