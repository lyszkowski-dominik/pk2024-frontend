import api from '../../services/axiosInstance';

interface IParams {
  rateId: number;
}

const RemoveRate = async ({ rateId }: IParams) => {
  try {
    const { data } = await api.delete(`/billings/rates/${rateId}`);
    return data;
  } catch (err: any) {
    return err.response.data;
  }
};

export { RemoveRate };
