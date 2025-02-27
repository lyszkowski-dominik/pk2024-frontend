import { useGetBillings } from '../../../features/billings/useGetBillings';
import usePagination from '../../../hooks/usePagination';
import Spinner from '../../ui/spinner/Spinner';
import List from '../../common/list/List';
import { Billing } from '../../../features/billings/billingTypes';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import DeleteBillingConfirmation from './DeleteBillingConfirmation';
import { accountColumns } from '../utils';

interface MonthlyBillingListProps {
  month: Date;
  isEditable?: boolean;
  hoaId: number;
}

const BillingsMonth = ({
  month,
  isEditable,
  hoaId,
}: MonthlyBillingListProps) => {
  const navigate = useNavigate();
  const { page, setPage, pageSize } = usePagination(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState<number>();

  const { data: monthBillings, isLoading } = useGetBillings({
    hoaId,
    page,
    pageSize,
    month: dayjs(month).get('month') + 1,
    year: dayjs(month).get('year'),
  });

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      {deleteModalOpen && selectedBilling && (
        <DeleteBillingConfirmation
          id={selectedBilling}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
      {monthBillings && monthBillings.results.length > 0 ? (
        <List
          columns={accountColumns}
          data={monthBillings}
          page={page}
          pageSize={pageSize}
          onPageChange={changePage}
          {...(isEditable && {
            onDelete: (billing: Billing) => {
              setDeleteModalOpen(true);
              setSelectedBilling(billing.id);
            },
          })}
          onRowClick={(billing) =>
            navigate(`/hoa/${hoaId}/charges/billings/${billing.id}`)
          }
        />
      ) : (
        <div>Brak danych rachunków</div>
      )}
    </>
  );
};
export default BillingsMonth;
