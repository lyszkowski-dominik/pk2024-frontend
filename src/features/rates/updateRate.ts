import api from '../../services/axiosInstance';
import { IRate } from '../billings/billingTypes';

const UpdateRate = async (data: IRate) => {
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