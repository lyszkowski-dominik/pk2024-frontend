import styles from './Resolutions.module.scss';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../app/slices/sharedDataSlice';
import usePagination from '../../hooks/usePagiantion';
import { useGetResolutions } from '../../hooks/useGetResolutions';
import List from '../../components/list/List';
import Spinner from '../../components/ui/spinner/Spinner';
import Modal from '../../components/ui/modal/Modal';
import { ModalType } from '../../components/property/types';
import IconButton from '../../components/ui/iconButton/IconButton';
import AddResolutionForm from '../../components/resolutions/AddResolutionForm';
import { selectRoles } from '../../components/loginForm/loginFormSlice';

const listColumns = [
  {
    name: 'title',
    label: 'Nazwa',
    type: 'string',
  },
  {
    name: 'created_at',
    label: 'Utworzono',
    type: 'datetime',
  },
  {
    name: 'start_date',
    label: 'Rozpczęcie',
    type: 'datetime',
  },
  {
    name: 'end_date',
    label: 'Zakończenie',
    type: 'datetime',
  },
];

const Resolutions = () => {
  const hoaID = useAppSelector(selectSelectedCommunity) || -1;
  const { page, setPage, pageSize } = usePagination();
  const userRole = useAppSelector(selectRoles);
  const canAddResolution = userRole === 'manager';

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
  } = useGetResolutions({
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
            <AddResolutionForm
              onCancel={() => {
                setModalOn(false);
                refreshPage();
              }}
            />
          )}
        </Modal>
      )}
      <div className={styles.iconButtons}>
        {canAddResolution && <IconButton
          iconName="add"
          onClick={() => {
            setOpenModal(ModalType.Add);
            setModalOn(true);
          }}
          altText="Add User"
          size={24}
          color="var(--pink)"
        />}
        {canAddResolution && <IconButton
          iconName="import"
          onClick={handleImportClick}
          altText="Import Properties"
          size={24}
          color="var(--pink)"
        />}
        {canAddResolution && <IconButton
          iconName="export"
          onClick={handleExportClick}
          altText="Export Properties"
          size={24}
          color="var(--pink)"
        />}
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
        getDetailsHref={(record) =>
          '/hoa/' + hoaID + '/resolutions/' + record.id
        }
      />
    </div>
  );
};

export default Resolutions;
