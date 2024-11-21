import List from '../common/list/List';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import usePagination from '../../hooks/usePagiantion';
import Spinner from '../ui/spinner/Spinner';
import styles from './ManagerRequests.module.scss';
import { requestTypesColumns } from './utils';
import { useNavigate } from 'react-router';
import { useGetRequestTypes } from '../../features/request_types/useGetRequestTypes';

const RequestsTypesList = () => {
  const navigate = useNavigate();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const { page, pageSize, setPage } = usePagination();

  const { isLoading, data } = useGetRequestTypes({
    hoaId,
    page,
    pageSize,
  });

  const navigateToRequestsTypes = (id: number) => {
    navigate('/hoa/' + hoaId + '/request_types/' + id);
  };

  return (
    <div className={styles.propertiesContainer}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Typy Zapytań</h1>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          data && (
            <List
              data={data}
              columns={requestTypesColumns}
              onPageChange={(pageNumber: number) => {
                setPage(pageNumber);
              }}
              page={page}
              pageSize={pageSize}
              onRowClick={(record) => navigateToRequestsTypes(record.id)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default RequestsTypesList;
