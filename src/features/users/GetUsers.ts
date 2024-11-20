import type { GetUsersRequest, User } from './usersTypes';
import api from '../../services/axiosInstance';
import type { ApiPaginatedResult } from '../../types/types';

const GetUsers = async ({ role, hoaId, page, pageSize }: GetUsersRequest) => {
  try {
    const response = await api.get(
      `/hoas/hoas/${hoaId}/users/?role=${role}&page=${page}&page_size=${pageSize}`,
    );
    return response.data as ApiPaginatedResult<User>;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetUsers;
