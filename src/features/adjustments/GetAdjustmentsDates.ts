import api from '../../services/axiosInstance';

const GetAdjustmentsDates = async ({
  hoaId,
  order_by = '-end_month',
}: {
  hoaId: number;
  order_by?: string;
}) => {
  try {
    const response = await api.get(
      `/billings/adjustments/adjustment_dates/?${hoaId !== undefined ? `&hoa=${hoaId}` : ''}&order_by=["${order_by}"]`,
    );
    return response.data as string[];
  } catch (err: any) {
    throw err.response.data;
  }
};

export default GetAdjustmentsDates;
