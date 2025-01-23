import api from '../../services/axiosInstance';

const DeleteMeterReading = async (id: number) => {
  try {
    const { data } = await api.delete(`/billings/meter_readings/${id}/`);
    return data;
  } catch (err: any) {
    return err.response.data;
  }
};

export { DeleteMeterReading };
