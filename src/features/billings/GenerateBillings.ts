import api from '../../services/axiosInstance';

const GenerateBillings = async (
  date: Date,
  hoaId?: number,
  propertyId?: number,
) => {
  try {
    const { data } = await api.post(`/hoas/properties/generate_bills/`, {
      hoa: hoaId,
      property: propertyId,
      day: 1,
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GenerateBillings;
