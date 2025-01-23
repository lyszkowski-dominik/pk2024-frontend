import api from '../../services/axiosInstance';

const DeleteProperty = async (id: number) => {
  try {
    const { data } = await api.delete(`/hoas/properties/${id}`);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default DeleteProperty;
