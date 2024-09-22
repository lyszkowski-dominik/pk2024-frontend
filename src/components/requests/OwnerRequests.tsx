import { useState } from 'react';
import List from '../list/List';
import { useGetRequests } from '../../features/requests/useGetRequests';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import usePagination from '../../hooks/usePagiantion';
import Spinner from '../ui/spinner/Spinner';
import styles from './ManagerRequests.module.scss';
import IconButton from '../ui/iconButton/IconButton';
import Modal from '../ui/modal/Modal';
import AddRequestForm from './AddRequestForm';

const listColumns = [
  {
    name: 'title',
    label: 'Tytuł',
    type: 'string',
  },
  {
    name: 'created',
    label: 'Utworzono',
    type: 'datetime',
  },
  {
    name: 'state',
    label: 'Stan',
    type: 'string',
  },
];

/**
 * 
 * @returns {JSX.Element} The `ManagerRequests` component returns a list of requests.
 */
const OwnerRequests = () => {
  const [isModalOn, setModalOn] = useState(false);
  const hoaID = useAppSelector(selectSelectedCommunity) || -1;
  const { page, setPage, pageSize } = usePagination();

  const {
    isLoading,
    data,
    refetch: refreshPage,
    isFetching,
  } = useGetRequests({
    hoaID,
    page,
    pageSize,
    queryKey: 'allRequests',
  });

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
    refreshPage();
  };

  return (
    <div className={styles.propertiesContainer}>
      <div className={styles.content}>
      {isModalOn && (
        <Modal>
          <AddRequestForm isModalOn={setModalOn} refreshList={refreshPage} />
        </Modal>
      )}
        <div className={styles.iconButtons}>
          <IconButton
            iconName="add"
            onClick={() => {
              setModalOn(true);
            }}
            altText="Add User"
            size={24}
            color="var(--pink)"
          />
        </div>
        {isLoading && <Spinner />}
        {!isLoading && (
          <List
            data={data}
            columns={listColumns}
            onPageChange={changePage}
            isFetching={isFetching}
            nameField="title"
            page={page}
            pageSize={pageSize}
            getDetailsHref={(record) =>
              '/hoa/' + hoaID + '/requests/' + record.id
            }
          />
        )}
      </div>
    </div>
  );
};

export default OwnerRequests;
