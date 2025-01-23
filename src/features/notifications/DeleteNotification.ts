import api from '../../services/axiosInstance';

const DeleteNotification = async (id: number) => {
  try {
    const { data } = await api.delete(`/notifications/notifications/${id}`);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { DeleteNotification };
