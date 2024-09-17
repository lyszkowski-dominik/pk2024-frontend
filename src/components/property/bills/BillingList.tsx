import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '../../../global_styles/Table.module.scss';
import Spinner from '../../ui/spinner/Spinner';
import { useNavigate } from 'react-router';
import { useGetBillings } from '../../../hooks/useGetBillings';
import type { IBilling } from '../../../types/billingTypes';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectSelectedCommunity } from '../../../app/slices/sharedDataSlice';
import { setUpdatedBillings } from '../../../app/slices/propertiesState';

interface IProps {
  propertyId?: number;
}

const BillingList = ({ propertyId }: IProps) => {
  const shouldUpdate = useAppSelector(
    (state) => state.propertiesState.updatedBillings,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const {
    data,
    error,
    isLoading,
    refetch: refreshPage,
  } = useGetBillings({
    page,
    pageSize,
  });
  const [billings, setBillings] = useState([]);

  const hoaId = useAppSelector(selectSelectedCommunity);

  useEffect(() => {
    refreshPage();
    if (data) {
      setBillings(
        (propertyId
          ? data?.results?.filter(
              (billing: IBilling) => billing.property === propertyId,
            )
          : data?.results
        )?.sort(
          (a: IBilling, b: IBilling) =>
            new Date(b.month).getTime() - new Date(a.month).getTime(),
        ),
      );
    }
  }, [page, data, refreshPage, propertyId]);

  useEffect(() => {
    if (shouldUpdate) {
      refreshPage();
      dispatch(setUpdatedBillings(false));
    }
  }, [shouldUpdate]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
    refreshPage();
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Błąd przy wczytywaniu danych</div>;
  if (billings.length <= 0) return <div>Brak rachunków</div>;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.clickableTable}>
        <thead>
          <tr>
            <th>Data</th>
            <th>Kwota</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {billings?.map((billing: IBilling) => (
            <tr
              key={billing.id}
              onClick={() => navigate(`/hoa/${hoaId}/billings/${billing.id}`)}
            >
              <td>{billing.month}</td>
              <td>{billing.total_amount}</td>
              <td>{billing.is_paid ? 'Opłacono' : 'Oczekuje na wpłatę'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil((data?.count ?? 0) / pageSize)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
      />
    </div>
  );
};

export default BillingList;
