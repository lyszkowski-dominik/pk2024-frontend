import api from '../../services/axiosInstance';
import { ApiPaginatedResult } from '../../types/types';
import { Rate, RatesRequest } from './ratesTypes';
const fetchAllRates = async ({
  page,
  pageSize,
  hoaId,
  onlyOld,
}: RatesRequest) => {
  try {
    const response = await api.get(
      // `/billings/rates/?page=${page}&page_size=${pageSize}&hoa=${hoaId}${onlyOld ? '&active=false' : '&active=true'}`,
      `/billings/rates/?page=${page}&page_size=${pageSize}&hoa=${hoaId}${onlyOld ? '&active=false' : ''}`,
    );
    return response.data as ApiPaginatedResult<Rate>;
  } catch (err: any) {
    throw err.response.data;
  }
};
export default fetchAllRates;
