import api from '../../services/axiosInstance';
import { Request } from './requestTypes';

const GetRequest = async (id: number) => {
  try {
    const response = await api.get(`/requests/requests/${id}/`);
    return response.data as Request;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetRequest;
