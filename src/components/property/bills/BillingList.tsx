import Spinner from '../../ui/spinner/Spinner';
import { useNavigate } from 'react-router';
import { useGetBillings } from '../../../features/billings/useGetBillings';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import usePagination from '../../../hooks/usePagination';
import { columns, getData } from './billingsUtils';
import { selectSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import List from '../../common/list/List';

/**
 * @property {number} propertyId - The `propertyId` property represents the id of the property.
 */
export interface IProps {
  propertyId: number;
}

/**
 *
 * @param {IProps} { propertyId } - The `BillingList` component displays a list of bills.
 * @returns {JSX.Element} The `BillingList` component returns a list of bills.
 */
const BillingList = ({ propertyId }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;

  const { page, setPage, pageSize } = usePagination(false);
  const { data, error, isLoading } = useGetBillings({
    hoaId,
    propertyId,
    page,
    pageSize,
  });

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Błąd przy wczytywaniu danych</div>;
  if (data && data.results.length <= 0) return <div>Brak rachunków</div>;

  return (
    <>
      {data && (
        <List
          data={getData(data)}
          columns={columns}
          onPageChange={changePage}
          page={page}
          pageSize={pageSize}
          onRowClick={(billing) =>
            navigate(`/hoa/${hoaId}/charges/billings/${billing.id}`)
          }
        />
      )}
    </>
  );
};

export default BillingList;
