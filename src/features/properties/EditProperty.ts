import type { Property } from './propertiesTypes';
import api from '../../services/axiosInstance';

const EditProperty = async (formData: Partial<Property>) => {
  try {
    const { data } = await api.patch(
      `/hoas/properties/${formData.id}/`,
      formData,
    );
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { EditProperty };
