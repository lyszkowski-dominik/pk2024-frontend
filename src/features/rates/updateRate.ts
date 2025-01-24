import api from '../../services/axiosInstance';
import { Rate } from './ratesTypes';

const UpdateRate = async (data: Rate) => {
    const test = data;
    console.log(test);
    try {
        const response = await api.patch(
          `/billings/rates/${data.id}/`,
            data
        );
        return response.data;
      } catch (err: any) {
        throw err.response.data;
      }
};
export { UpdateRate };