import api from '../../services/axiosInstance';
import { ApiPaginatedResult } from '../../types/types';
import { GetRatesRequest, RatesSet } from './ratesTypes';

const GetRates = async ({ hoaId, state, page, pageSize }: GetRatesRequest) => {
  try {
    const response = await api.get(
      `/billings/rates/?page=${page}&page_size=${pageSize}${hoaId! ? `&hoa=${hoaId}` : ''}${state! ? `&state=${state}` : ''}`,
    );
    return response.data as ApiPaginatedResult<RatesSet>;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetRates;
