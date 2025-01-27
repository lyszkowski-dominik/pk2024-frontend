import api from '../../services/axiosInstance';

interface IParams {
  hoaId: number;
  userId: number;
}

const RemoveUser = async ({ hoaId, userId }: IParams) => {
  try {
    const { data } = await api.delete(
      `/hoas/hoas/${hoaId}/users/?user_id=${userId}`,
    );
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { RemoveUser };
