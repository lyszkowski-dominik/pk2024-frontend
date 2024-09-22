import styles from './Users.module.scss';
import { useEffect, useState } from 'react';
import { useGetUsers } from '../../features/users/useGetUsers';
import Spinner from '../../components/ui/spinner/Spinner';
import Modal from '../../components/ui/modal/Modal';
import { ModalType } from '../../components/property/types';
import IconButton from '../../components/ui/iconButton/IconButton';
import AddUserForm from '../../components/users/AddUserForm';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import { downloadFile } from '../../utils/downloadFile';
import FileUploadForm from '../../components/forms/fileUploadForm/FileUploadForm';
import { UserRole } from '../../types/types';
import UsersList from '../../components/users/UsersList';

/**
 * @property {string} type The `type` property is a string that specifies the type of user.
 */
export interface UsersProps {
  type: string;
}

/**
 *
 * @param {string} type The `type` parameter is a string that specifies the type of user.
 * @returns {JSX.Element} The `Owners` component returns a list of owners or managers.
 */
const Users = ({ type }: UsersProps) => {
  const hoaID = useAppSelector(selectSelectedCommunity) || -1;
  const userRole = useAppSelector(selectRoles);
  const canAddManager = userRole === UserRole.Manager;
  const [page, setPage] = useState(1);

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
  } = useGetUsers({
    role: type,
    hoaID,
    page,
  });
  const [isModalOn, setModalOn] = useState(false);
  const [openModal, setOpenModal] = useState({});

  useEffect(() => {
    refreshPage();
  }, [page, data, hoaID, refreshPage]);

  if (isLoading) return <Spinner />;
  if (error) return <div>Błąd ładowania danych</div>;

  function handleImportClick() {
    setOpenModal(ModalType.Import);
    setModalOn(true);
  }

  function handleExportClick() {
    downloadFile(`/auth/users/export?hoa=${hoaID}&role=${type}`, 'users.csv');
  }

  return (
    <div className={styles.propertiesContainer}>
      {isModalOn && (
        <Modal>
          {openModal === ModalType.Add && (
            <AddUserForm
              isModalOn={setModalOn}
              refreshList={refreshPage}
              role={type}
            />
          )}
          {openModal === ModalType.Import && (
            <>
              <h1>Import {type === 'owner' ? 'właścicieli' : 'zarządców'}</h1>
              <FileUploadForm
                url={`/auth/users/import/?hoa=${hoaID}&role=${type}`}
                setModalOn={setModalOn}
                refreshPage={refreshPage}
              />
            </>
          )}
        </Modal>
      )}
      <div className={styles.iconButtons}>
        {canAddManager && (
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
        {canAddManager && (
          <IconButton
            iconName="import"
            onClick={handleImportClick}
            altText="Import Properties"
            size={24}
            color="var(--pink)"
          />
        )}
        {canAddManager && (
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
      <UsersList
        usersData={data}
        changePage={changePage}
        isFetching={isFetching}
        refetch={refreshPage}
      />
    </div>
  );
};

export default Users;
