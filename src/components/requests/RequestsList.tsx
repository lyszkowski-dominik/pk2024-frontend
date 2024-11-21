import List from '../common/list/List';
import { useGetRequests } from '../../features/requests/useGetRequests';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import usePagination from '../../hooks/usePagiantion';
import Spinner from '../ui/spinner/Spinner';
import styles from './ManagerRequests.module.scss';
import { requestColumns } from './utils';
import { useNavigate } from 'react-router';
import {
  Request,
  RequestState,
  stateDisplayMap,
} from '../../features/requests/requestTypes';
import { ApiPaginatedResult } from '../../types/types';

const RequestsList = ({
  header,
  assignedToMe,
  state,
}: {
  header?: string;
  assignedToMe?: boolean;
  state?: RequestState;
}) => {
  const navigate = useNavigate();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const { page, pageSize, setPage } = usePagination();

  const { isLoading, data } = useGetRequests({
    hoaId,
    page,
    pageSize,
    assignedToMe,
    state,
  });

  const getRequestData = (data: ApiPaginatedResult<Request>) => ({
    ...data,
    results: data?.results.map((request) => ({
      ...request,
      state: stateDisplayMap[request.state],
    })),
  });

  const navigateToRequest = (id: number) => {
    navigate('/hoa/' + hoaId + '/requests/' + id);
  };

  return (
    <div className={styles.propertiesContainer}>
      <div className={styles.content}>
        {header && (
          <div className={styles.header}>
            <h1>{header}</h1>
          </div>
        )}
        {isLoading ? (
          <Spinner />
        ) : (
          data && (
            <List
              data={getRequestData(data)}
              columns={requestColumns}
              onPageChange={(pageNumber: number) => {
                setPage(pageNumber);
              }}
              page={page}
              pageSize={pageSize}
              onRowClick={(record) => navigateToRequest(record.id)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default RequestsList;
