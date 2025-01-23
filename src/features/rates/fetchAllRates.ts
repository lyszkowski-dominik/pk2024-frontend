import api from '../../services/axiosInstance';
import { ApiPaginatedResult } from '../../types/types';
import { Rate, RatesRequest } from './ratesTypes';

const fetchAllRates = async ({ page, pageSize, hoaId }: RatesRequest) => {
  try {
    const response = await api.get(
      `/billings/rates/?page=${page}&page_size=${pageSize}&hoa=${hoaId}`,
    );
    return response.data as ApiPaginatedResult<Rate>;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default fetchAllRates;
