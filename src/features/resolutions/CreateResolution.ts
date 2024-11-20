import api from '../../services/axiosInstance';

export type CreateResolutionParams = {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  hoa: number;
};

const CreateResolution = async (params: CreateResolutionParams) => {
  try {
    const { data } = await api.post(`/resolutions/resolutions/`, params);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { CreateResolution };
