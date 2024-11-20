import api from '../../services/axiosInstance';

const DeleteResolution = async (id: number) => {
  try {
    const { data } = await api.delete(`/resolutions/resolutions/${id}`);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { DeleteResolution };
