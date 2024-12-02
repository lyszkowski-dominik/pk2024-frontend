import { Notification } from './notificationTypes';
import api from '../../services/axiosInstance';

const CreateNewNotification = async (params: Partial<Notification>) => {
  try {
    const { data } = await api.post(`/notifications/notifications/`, params);
    return data;
  } catch (err: any) {
    return err.response.data;
  }
};

export { CreateNewNotification };
