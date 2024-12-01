import api from '../../services/axiosInstance';
import type { ApiPaginatedResult } from '../../types/types';
import { User } from '../users/usersTypes';
import { GetUsersRequest } from './userProfileTypes';

const GetUsers = async ({
  role,
  excludeHoa,
  page,
  pageSize,
}: GetUsersRequest) => {
  try {
    const response = await api.get(
      `/auth/users/?&page=${page}&page_size=${pageSize}${role && '&role=' + role}${excludeHoa && '&exclude_hoa=' + excludeHoa}`,
    );
    return response.data as ApiPaginatedResult<User>;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetUsers;
