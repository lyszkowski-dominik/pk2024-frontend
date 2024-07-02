import styles from './Owners.module.scss';
import { useEffect, useState } from 'react';
import { useGetOwners } from '../../hooks/useGetOwners';
import OwnersList from './OwnersList';
import Spinner from '../ui/spinner/Spinner';
import Modal from '../ui/modal/Modal';
import { ModalType } from '../property/types';
import IconButton from '../ui/iconButton/IconButton';
import AddUserForm from './AddUserForm';


interface OwnersProps {
  type: string;
}

const Owners = ({ type }: OwnersProps) => {
  // get current url value
  const path = window.location.pathname; // /hoa/1
  const hoaID = parseInt(path.split('/').pop() || '', 10); // 1
  const [page, setPage] = useState(1);

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
    refreshPage();
  };

  const { isLoading, data, error, refetch: refreshPage, isFetching } = useGetOwners({
    role: type,
    hoaID,
    page
  });
  const [isModalOn, setModalOn] = useState(false);
  const [openModal, setOpenModal] = useState({});

  useEffect(() => {
    refreshPage();
  }, [page, data, hoaID]);

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
            <AddUserForm isModalOn={setModalOn} refreshList={refreshPage} />
          )}
        </Modal>
      )}
      <div className={styles.iconButtons}>
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
        <IconButton
          iconName="import"
          onClick={handleImportClick}
          altText="Import Properties"
          size={24}
          color="var(--pink)"
        />
        <IconButton
          iconName="export"
          onClick={handleExportClick}
          altText="Export Properties"
          size={24}
          color="var(--pink)"
        />
      </div>

      {isFetching && <Spinner />}
      <OwnersList ownersData={data} changePage={changePage} isFetching={isFetching} refetch={refreshPage} />
    </div>
  );
};

export default Owners;