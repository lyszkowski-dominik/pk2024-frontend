import type { Property } from './propertiesTypes';
import api from '../../services/axiosInstance';

const GetProperty = async (id: number) => {
  try {
    const response = await api.get(`/hoas/properties/${id}`);
    return response.data as Property;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetProperty;
