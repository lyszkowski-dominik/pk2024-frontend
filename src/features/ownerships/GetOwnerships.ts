import { Ownership, OwnershipsRequest } from './ownershipTypes';
import api from '../../services/axiosInstance';
import { ApiPaginatedResult } from '../../types/types';

const GetOwnerships = async ({
  page,
  pageSize,
  propertyId,
}: OwnershipsRequest) => {
  try {
    const response = await api.get(
      `/hoas/ownerships/?page=${page}&page_size=${pageSize}&property=${propertyId}`,
    );
    return response.data as ApiPaginatedResult<Ownership>;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetOwnerships;
