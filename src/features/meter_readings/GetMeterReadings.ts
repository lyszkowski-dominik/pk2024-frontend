import type { ApiPaginatedResult } from '../../types/types';
import api from '../../services/axiosInstance';
import { MeterReading } from '../billings/billingTypes';
import { MetersReadingsRequest } from './metersTypes';

const GetMeterReadings = async ({
  page,
  pageSize,
  propertyId,
  meterId,
}: MetersReadingsRequest) => {
  try {
    const response = await api.get(
      `/billings/meter_readings/?page=${page}&page_size=${pageSize}&property=${propertyId}&meter=${meterId}`,
    );

    return response.data as ApiPaginatedResult<MeterReading>;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetMeterReadings;
