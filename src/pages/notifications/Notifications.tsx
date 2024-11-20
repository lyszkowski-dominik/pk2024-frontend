import styles from './Notifications.module.scss';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import usePagination from '../../hooks/usePagiantion';
import List from '../../components/common/list/List';
import Spinner from '../../components/ui/spinner/Spinner';
import Modal from '../../components/ui/modal/Modal';
import { ModalType } from '../../components/property/types';
import IconButton from '../../components/ui/iconButton/IconButton';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import { useGetNotifications } from '../../features/notifications/useGetNotifications';
import AddNotificationForm from '../../components/notifications/AddNotificationForm';

const listColumns = [
  {
    name: 'message',
    label: 'Wiadomość',
    type: 'string',
  },
  {
    name: 'created_at',
    label: 'Utworzono',
    type: 'datetime',
  },
];
/**
 *
 * @returns {React.FunctionComponent} The `Resolutions` component is a functional component that displays a list of notifications.
 */
const Notifications = () => {
  const hoaID = useAppSelector(selectSelectedCommunity) || -1;
  const { page, setPage, pageSize } = usePagination();
  const userRole = useAppSelector(selectRoles);
  const canAddNotification = userRole === 'manager';

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
    refreshPage();
  };

  const {
    isLoading,
    data,
    error,
    refetch: refreshPage,
    isFetching,
  } = useGetNotifications({
    hoaID,
    page: page,
    pageSize,
  });

  const [isModalOn, setModalOn] = useState(false);
  const [openModal, setOpenModal] = useState({});

  useEffect(() => {
    refreshPage();
  }, [page, data, hoaID, refreshPage]);

  if (isLoading) return <Spinner />;
  if (error) return <div>Błąd ładowania danych</div>;

  function handleImportClick() {
    console.log('Import clicked');
  }

  function handleExportClick() {
    console.log('Export clicked');
  }

  return (
    <div className={styles.propertiesContainer}>
      {isModalOn && (
        <Modal>
          {openModal === ModalType.Add && (
            <AddNotificationForm
              onCancel={() => {
                setModalOn(false);
                refreshPage();
              }}
            />
          )}
        </Modal>
      )}
      <div className={styles.iconButtons}>
        {canAddNotification && (
          <IconButton
            iconName="add"
            onClick={() => {
              setOpenModal(ModalType.Add);
              setModalOn(true);
            }}
            altText="Add User"
            size={24}
            color="var(--pink)"
          />
        )}
        {canAddNotification && (
          <IconButton
            iconName="import"
            onClick={handleImportClick}
            altText="Import Properties"
            size={24}
            color="var(--pink)"
          />
        )}
        {canAddNotification && (
          <IconButton
            iconName="export"
            onClick={handleExportClick}
            altText="Export Properties"
            size={24}
            color="var(--pink)"
          />
        )}
      </div>

      {isFetching && <Spinner />}
      <List
        data={data}
        columns={listColumns}
        onPageChange={changePage}
        isFetching={isFetching}
        nameField="title"
        page={page}
        pageSize={pageSize}
        getDetailsHref={(record) => record.link}
      />
    </div>
  );
};

export default Notifications;
