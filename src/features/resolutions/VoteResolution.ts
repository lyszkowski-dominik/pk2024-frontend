import api from '../../services/axiosInstance';
import { Resolution, Vote } from './resolutionsTypes';

type VoteResolutionData = {
  id: number;
  choice: Vote;
};

const VoteResolution = async ({ id, choice }: VoteResolutionData) => {
  try {
    const { data } = await api.post(`/resolutions/resolutions/${id}/vote/`, {
      choice,
    });
    return data as Resolution;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default VoteResolution;
