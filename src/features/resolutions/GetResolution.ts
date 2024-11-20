import api from '../../services/axiosInstance';
import { Resolution } from './resolutionsTypes';

const GetResolution = async (id: number) => {
  try {
    const response = await api.get(`/resolutions/resolutions/${id}`);
    return response.data as Resolution;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetResolution;
