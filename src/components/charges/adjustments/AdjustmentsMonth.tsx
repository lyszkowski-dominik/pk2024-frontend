import usePagination from '../../../hooks/usePagination';
import Spinner from '../../ui/spinner/Spinner';
import List from '../../common/list/List';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import { useGetAdjustments } from '../../../features/adjustments/useGetAdjustments';
import DeleteAdjustmentConfirmation from './DeleteAdjustmentConfirmation';
import { Adjustment } from '../../../features/adjustments/adjustmentsTypes';
import { accountColumns } from '../utils';

interface MonthlyAdjustmentsListProps {
  month: Date;
  isEditable?: boolean;
  hoaId: number;
}

const AdjustmentMonth = ({
  month,
  isEditable,
  hoaId,
}: MonthlyAdjustmentsListProps) => {
  const navigate = useNavigate();
  const { page, setPage, pageSize } = usePagination(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAdjustment, setSelectedAdjustment] = useState<number>();

  const { data: monthAdjustments, isLoading } = useGetAdjustments({
    hoaId,
    page,
    pageSize,
    month: dayjs(month).subtract(1, 'month').get('month') + 1,
    year: dayjs(month).subtract(1, 'month').get('year'),
  });

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      {deleteModalOpen && selectedAdjustment && (
        <DeleteAdjustmentConfirmation
          id={selectedAdjustment}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
      {monthAdjustments && monthAdjustments.results.length > 0 ? (
        <List
          columns={accountColumns}
          data={monthAdjustments}
          page={page}
          pageSize={pageSize}
          onPageChange={changePage}
          {...(isEditable && {
            onDelete: (adjustment: Adjustment) => {
              setDeleteModalOpen(true);
              setSelectedAdjustment(adjustment.id);
            },
          })}
          onRowClick={(adjustment) =>
            navigate(`/hoa/${hoaId}/charges/adjustments/${adjustment.id}`)
          }
        />
      ) : (
        <div>Brak danych korekt</div>
      )}
    </>
  );
};
export default AdjustmentMonth;
