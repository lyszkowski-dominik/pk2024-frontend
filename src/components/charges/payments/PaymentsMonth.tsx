import usePagination from '../../../hooks/usePagination';
import Spinner from '../../ui/spinner/Spinner';
import List from '../../common/list/List';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import { getPaymentData, paymentColumns } from '../utils';
import { useGetPayments } from '../../../features/payments/useGetPayments';

interface MonthlyPaymentListProps {
  month: Date;
  isEditable?: boolean;
  hoaId: number;
}

const PaymentsMonth = ({
  month,
  isEditable,
  hoaId,
}: MonthlyPaymentListProps) => {
  const navigate = useNavigate();
  const { page, setPage, pageSize } = usePagination(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<number>();

  const { data: monthPayments, isLoading } = useGetPayments({
    hoaId,
    page,
    pageSize,
    month: dayjs(month).get('month') + 1,
  });

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      {monthPayments && monthPayments.results.length > 0 ? (
        <List
          columns={paymentColumns}
          data={getPaymentData(monthPayments)}
          page={page}
          pageSize={pageSize}
          onPageChange={changePage}
        />
      ) : (
        <div>Brak danych rachunków</div>
      )}
    </>
  );
};
export default PaymentsMonth;
