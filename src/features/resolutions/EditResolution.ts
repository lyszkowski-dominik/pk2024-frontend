import api from '../../services/axiosInstance';
import { localDateToISO } from '../../utils/date';
import { CreateResolutionParams } from './CreateResolution';

type EditResolutionParams = {
  id: number;
  editedData: CreateResolutionParams;
};

const EditResolution = async ({ id, editedData }: EditResolutionParams) => {
  try {
    const { data } = await api.patch(`/resolutions/resolutions/${id}/`, {
      ...editedData,
      start_date: new Date(localDateToISO(editedData.start_date)),
      end_date: new Date(localDateToISO(editedData.end_date)),
    });
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { EditResolution };
