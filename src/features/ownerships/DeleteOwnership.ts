import api from '../../services/axiosInstance';

const DeleteOwnership = async (id: number) => {
  try {
    const { data } = await api.delete(`/hoas/ownerships/${id}/`);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { DeleteOwnership };
