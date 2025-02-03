import type { ApiPaginatedResult } from '../../../types/types';
import api from '../../../services/axiosInstance';
import { MetersReadingsRequest } from './meterReadingsTypes';
import { MeterReading } from '../metersApiTypes';

const GetMeterReadings = async ({
  page,
  pageSize,
  propertyId,
  meterId,
  hoaId,
}: MetersReadingsRequest) => {
  try {
    const response = await api.get(
      `/billings/meter_readings/?page=${page}&page_size=${pageSize}${propertyId ? `&property=${propertyId}` : ''}${meterId ? `&meter=${meterId}` : ''}${hoaId ? `&hoa=${hoaId}` : ''}&order_by="reading_date"`,
    );

    return response.data as ApiPaginatedResult<MeterReading>;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetMeterReadings;
