import type {
  GetNotificationsRequest,
  Notification,
} from '../notifications/notificationTypes';
import api from '../../services/axiosInstance';
import { ApiPaginatedResult } from '../../types/types';

const GetNotifications = async ({
  hoaId,
  page,
  pageSize,
}: GetNotificationsRequest) => {
  try {
    const response = await api.get(
      `/notifications/notifications?hoa=${hoaId}&page=${page}&page_size=${pageSize}`,
    );
    return response.data as ApiPaginatedResult<Notification>;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetNotifications;
