import { OwnershipChangeForm } from './ownershipTypes';
import api from '../../services/axiosInstance';

const ChangeOwnership = async (params: {
  formData: OwnershipChangeForm;
  propertyId: number;
}) => {
  try {
    const { data } = await api.post(
      `/hoas/properties/${params.propertyId}/change_owners/`,
      params.formData,
    );
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export { ChangeOwnership };
