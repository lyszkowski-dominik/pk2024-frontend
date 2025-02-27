import api from '../../services/axiosInstance';

const GeneratePayment = async (propertyId: number) => {
  try {
    const { data } = await api.post(
      `/hoas/properties/${propertyId}/generate_payment/`,
      {},
    );
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GeneratePayment;
