import { useNavigate } from 'react-router';

import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import usePagination from '../../hooks/usePagination';
import List from '../../components/common/list/List';
import Spinner from '../../components/ui/spinner/Spinner';
import { columns } from './utils';
import { useGetNotifications } from '../../features/notifications/useGetNotifications';

const NotificationsList = () => {
  const navigate = useNavigate();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const { page, setPage, pageSize } = usePagination();

  const { isLoading, data } = useGetNotifications({
    hoaId,
    page,
    pageSize,
  });

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        data && (
          <List
            data={data}
            columns={columns}
            onPageChange={changePage}
            page={page}
            pageSize={pageSize}
            //TODO - widok szczegółów? po co jest link?
            // onRowClick={(record) => navigate('/notifications/' + record.id)}
          />
        )
      )}
    </>
  );
};

export default NotificationsList;
