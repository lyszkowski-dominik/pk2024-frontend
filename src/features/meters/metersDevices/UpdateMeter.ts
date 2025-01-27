import api from '../../../services/axiosInstance';
import { Meter } from '../metersApiTypes';

const UpdateMeter = async (editedData: Partial<Meter>) => {
  try {
    const { data } = await api.patch(
      `/billings/meters/${editedData.id}/`,
      editedData,
    );
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { UpdateMeter };
