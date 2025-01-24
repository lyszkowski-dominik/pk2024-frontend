import api from '../../services/axiosInstance';
import { IRate } from '../billings/billingTypes';
const AddRate = async (data: IRate) => {
    const test = data;
    console.log(test);
    try {
        const response = await api.post(
          `/billings/rates/`,
            data
        );
        return response.data;
      } catch (err: any) {
        throw err.response.data;
      }
};
export { AddRate };