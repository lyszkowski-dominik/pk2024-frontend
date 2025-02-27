import { useGetBillings } from '../../../features/billings/useGetBillings';
import Spinner from '../../ui/spinner/Spinner';
import List from '../../common/list/List';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
// import DeleteBillingConfirmation from './DeleteBillingConfirmation';
import { useGetAdjustments } from '../../../features/adjustments/useGetAdjustments';
import { useGetPayments } from '../../../features/payments/useGetPayments';
import { columns, getData } from './billingsUtils';

interface BalanceItemProps {
  month: Date;
  isManager?: boolean;
  hoaId: number;
  propertyId: number;
}

const BalanceItem = ({
  month,
  isManager,
  hoaId,
  propertyId,
}: BalanceItemProps) => {
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState<number>();

  const { data: monthBillings, isLoading: loadingBillings } = useGetBillings({
    hoaId,
    propertyId,
    page: 1,
    pageSize: 10,
    month: dayjs(month).get('month') + 1,
    year: dayjs(month).get('year'),
  });

  const { data: monthPayments, isLoading: loadingPayments } = useGetPayments({
    hoaId,
    propertyId,
    page: 1,
    pageSize: 10,
    month: dayjs(month).get('month') + 1,
  });

  const { data: monthAdjustments, isLoading: loadingAdjustments } =
    useGetAdjustments({
      hoaId,
      propertyId,
      page: 1,
      pageSize: 10,
      month: dayjs(month).subtract(1, 'month').get('month') + 1,
      year: dayjs(month).subtract(1, 'month').get('year'),
    });

  if (loadingAdjustments || loadingBillings || loadingPayments)
    return <Spinner />;

  return (
    <>
      {/* {deleteModalOpen && selectedBilling && (
        <DeleteBillingConfirmation
          id={selectedBilling}
          onClose={() => setDeleteModalOpen(false)}
        />
      )} */}
      {(monthBillings && monthBillings.results.length > 0) ||
      (monthPayments && monthPayments.results.length > 0) ||
      (monthAdjustments && monthAdjustments.results.length > 0) ? (
        <List
          columns={columns(isManager)}
          data={getData(
            monthBillings,
            monthPayments,
            monthAdjustments,
            isManager,
          )}
          onRowClick={(item: any) => {
            if (item.type === 'payment') return;
            navigate(`/hoa/${hoaId}/charges/${item.type}s/${item.id}`);
          }}
        />
      ) : (
        <div>Brak rachunków</div>
      )}
    </>
  );
};
export default BalanceItem;
