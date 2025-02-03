import api from '../../../services/axiosInstance';
import { MeterType } from '../metersApiTypes';

const EditMeterType = async (editedData: Partial<MeterType>) => {
  try {
    const response = await api.patch(
      `/billings/meter-types/${editedData.id}`,
      editedData,
    );
    return response.data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default EditMeterType;
