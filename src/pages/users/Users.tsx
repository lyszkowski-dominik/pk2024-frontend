import styles from './Users.module.scss';
import { useState } from 'react';
import Modal from '../../components/ui/modal/Modal';
import IconButton from '../../components/ui/iconButton/IconButton';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import { downloadFile } from '../../utils/downloadFile';
import FileUploadForm from '../../components/common/forms/fileUploadForm/FileUploadForm';
import { ModalType, UserRole } from '../../types/types';
import UsersList from '../../components/users/UsersList';
import { AddExistingUsersForm } from '../../components/users/AddExistingUsersForm';
import AddUserForm from '../../components/users/AddUserForm';
import InputField from '../../components/common/forms/inputField/InputField';
import { usersQueryKeys } from '../../features/users/usersTypes';

export interface UsersProps {
  type: UserRole;
}

const Users = ({ type }: UsersProps) => {
  const hoaID = useAppSelector(selectSelectedCommunity) || -1;
  const userRole = useAppSelector(selectRoles);
  const canAddManager = userRole === UserRole.Manager || userRole === UserRole.Admin;
  const [addingNew, setAddingNew] = useState(false);
  const [isModalOn, setModalOn] = useState(false);
  const [openModal, setOpenModal] = useState({});

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
            <div className={styles.addUsersFormContainer}>
              <AddExistingUsersForm
                role={type}
                onClose={() => setModalOn(false)}
                disabled={addingNew}
              />
              <InputField
                label="Dodaj nowego użytkownika"
                name="addingNew"
                value={addingNew}
                type="checkbox"
                checked={addingNew}
                onChange={() => {
                  setAddingNew(!addingNew);
                }}
              />
              {addingNew && (
                <AddUserForm onClose={() => setModalOn(false)} role={type} />
              )}
            </div>
          )}
          {openModal === ModalType.Import && (
            <>
              <h1>
                Import {type === UserRole.Owner ? 'właścicieli' : 'zarządców'}
              </h1>
              <FileUploadForm
                url={`/auth/users/import/?hoa=${hoaID}&role=${type}`}
                onClose={() => setModalOn(false)}
                queryKeys={[
                  usersQueryKeys.filters({ hoaId: hoaID, role: type }),
                ]}
              />
            </>
          )}
        </Modal>
      )}
      {canAddManager && (
        <div className={styles.iconButtons}>
          <IconButton
            iconName="add"
            onClick={() => {
              setOpenModal(ModalType.Add);
              setModalOn(true);
            }}
            altText="Dodaj użytkownika"
          />
          <IconButton
            iconName="import"
            onClick={handleImportClick}
            altText="Importuj użytkowników"
          />
          <IconButton
            iconName="export"
            onClick={handleExportClick}
            altText="Eksportuj użytkowników"
          />
        </div>
      )}

      <UsersList type={type} />
    </div>
  );
};

export default Users;
