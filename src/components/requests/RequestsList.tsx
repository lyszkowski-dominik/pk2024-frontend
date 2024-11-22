import List, { ColumnDef } from '../common/list/List';
import { useGetRequests } from '../../features/requests/useGetRequests';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import usePagination from '../../hooks/usePagination';
import Spinner from '../ui/spinner/Spinner';
import styles from './ManagerRequests.module.scss';
import { getRequestData, requestColumns } from './utils';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import InputField from '../common/forms/inputField/InputField';
import { RequestState } from '../../features/requests/requestTypes';

const RequestsList = ({
  header,
  columns,
  closedCheckbox = false,
  assignedTo,
  notAssigned,
}: {
  header?: string;
  columns?: ColumnDef[];
  closedCheckbox?: boolean;
  assignedTo?: number;
  notAssigned?: boolean;
}) => {
  const navigate = useNavigate();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const { page, pageSize, setPage } = usePagination();
  const [showClosed, setShowClosed] = useState(false);

  const states =
    closedCheckbox && !showClosed
      ? Object.keys(RequestState).filter((k) => k !== RequestState.closed)
      : undefined;

  const { isLoading, data } = useGetRequests({
    hoaId,
    page,
    pageSize,
    assignedTo,
    states,
    notAssigned,
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
            <>
              {closedCheckbox && (
                <div className={styles.checkbox}>
                  <InputField
                    label="Pokaż zamknięte"
                    name="showClosed"
                    value={showClosed}
                    type="checkbox"
                    checked={showClosed}
                    onChange={() => setShowClosed(!showClosed)}
                  />
                </div>
              )}
              <List
                data={getRequestData(data)}
                columns={columns ?? requestColumns}
                onPageChange={(pageNumber: number) => {
                  setPage(pageNumber);
                }}
                page={page}
                pageSize={pageSize}
                onRowClick={(record) => navigateToRequest(record.id)}
              />
            </>
          )
        )}
      </div>
    </div>
  );
};

export default RequestsList;
